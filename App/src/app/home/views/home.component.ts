import { UserTeamEntity } from './../../shared/entities/userTeam.entity';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { HomeService } from '../service/home.service';
import { ProjectEntity } from '../../project/entities/project.entity';
import { TaskEntity } from '../../task/entities/task.entity';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  totalProjects: number = 0;
  pendingProjects: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;
  completionRate: number = 0;
  totalTeam: number = 0;
  pendingTasksTeam: string = '';
  completedTasksTeam: string = '';
  completedTasksMembers: string = '';
  pendingTasksMembers: string = '';

  totalProjectsChart: any;
  projectsByTeamChart: any;
  tasksByProjectChart: any;
  totalTasksChart: any;
  teamChart: any;
  memberChart: any;

  constructor(private homeService: HomeService) {}

  calculateCompletionRate(completed: number, total: number): number {
    return total > 0 ? (completed / total) * 100 : 0;
  }

  ngOnInit(): void {
    this.homeService.isFetching.set(true);
    this.homeService.list().subscribe({
      next: (resData) => {
        console.log(resData);
        this.totalProjects = resData.projects.length;
        this.pendingProjects = resData.projects.filter(
          (project: ProjectEntity) => !project.isCompleted
        ).length;
        this.completedTasks = resData.tasks.filter(
          (task: TaskEntity) => task.isCompleted
        ).length;
        this.pendingTasks = resData.tasks.filter(
          (task: TaskEntity) => !task.isCompleted
        ).length;
        this.totalTeam = resData.teams.length;
        this.completedTasksTeam =
          resData.teams.length > 0
            ? `${(
                resData.tasks.filter((task: TaskEntity) => task.isCompleted)
                  .length / resData.teams.length
              ).toFixed(2)}`
            : '0';
        this.pendingTasksTeam =
          resData.teams.length > 0
            ? `${(
                resData.tasks.filter((task: TaskEntity) => !task.isCompleted)
                  .length / resData.teams.length
              ).toFixed(2)}`
            : '0';
        this.completedTasksMembers =
          resData.user.length > 0
            ? `${(
                resData.tasks.filter((task: TaskEntity) => task.isCompleted)
                  .length / resData.user.length
              ).toFixed(2)}`
            : '0';
        this.pendingTasksMembers =
          resData.user.length > 0
            ? `${(
                resData.tasks.filter((task: TaskEntity) => !task.isCompleted)
                  .length / resData.user.length
              ).toFixed(2)}`
            : '0';

        this.completionRate = this.calculateCompletionRate(
          this.completedTasks,
          resData.tasks.length
        );

        this.loadTotalProjectsChart(resData.projects);
        this.loadProjectsByTeamChart(resData.projectsByTeams);
        this.loadTasksByProjectChart(resData.tasksByProjects);
        this.loadTotalTasksChart(resData.tasks);
        this.loadTeamPerformanceChart(resData.teams, resData.tasks);
        this.loadMemberPerformanceChart(resData.user, resData.tasks);
      },
      error: (error: Error) => {
        this.homeService.error.set(error.message);
      },
      complete: () => {
        this.homeService.isFetching.set(false);
      },
    });
  }

  handleHover = (evt: any, item: any, legend: any) => {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color: string, index: number, colors: string[]) => {
        colors[index] =
          index === item.index || color.length === 9 ? color : color + '4D';
      }
    );
    legend.chart.update();
  };

  handleLeave = (evt: any, item: any, legend: any) => {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color: string, index: number, colors: string[]) => {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color;
      }
    );
    legend.chart.update();
  };

  public isOverdue(project: ProjectEntity): boolean {
    const currentDate = new Date();
    return new Date(project.endDate!) < currentDate && !project.isCompleted;
  }

  public isDueSoon(project: ProjectEntity): boolean {
    const currentDate = new Date();
    const dueDate = new Date(project.endDate!);
    const diffInTime = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 5 && diffInDays > 0 && !project.isCompleted;
  }

  loadTotalProjectsChart(projects: ProjectEntity[]) {
    const projectStatusData = [
      {
        status: 'Concluído',
        count: projects.filter((p) => p.isCompleted).length,
        color: '#A4D65E',
      },
      {
        status: 'Pendente',
        count: projects.filter((p) => !this.isDueSoon(p)).length,
        color: '#FFD700',
      },
      {
        status: 'Atrasado',
        count: projects.filter((p) => this.isOverdue(p)).length,
        color: '#FF6961',
      },
      {
        status: 'Atrasar',
        count: projects.filter((p) => this.isDueSoon(p)).length,
        color: '#FFB347',
      },
    ];

    this.totalProjectsChart = new Chart('totalProjectsChart', {
      type: 'doughnut',
      data: {
        labels: projectStatusData.map((status) => status.status),
        datasets: [
          {
            label: 'Status dos Projetos',
            data: projectStatusData.map((status) => status.count),
            backgroundColor: projectStatusData.map((status) => status.color),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
        },
      },
    });
  }

  loadProjectsByTeamChart(projects: any[]) {
    const teamData = projects.reduce((acc, team) => {
      acc.push({
        name: team.name,
        projects: team.teamProjects.length,
        color: team.color,
      });
      return acc;
    }, [] as { name: string; projects: number; color: string }[]);

    this.projectsByTeamChart = new Chart('projectsByTeamChart', {
      type: 'doughnut',
      data: {
        labels: teamData.map((team: { name: string }) => team.name),
        datasets: [
          {
            label: 'Projetos por Equipe',
            data: teamData.map((team: { projects: number }) => team.projects),
            backgroundColor: teamData.map(
              (team: { color: string }) => team.color
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
        },
      },
    });
  }

  private getFirstLetters = (title: string) => {
    return title
      .split(' ')
      .map((word) => word[0])
      .join('');
  };

  loadTasksByProjectChart(projects: any[]) {
    const projectData = projects.reduce((acc, projects) => {
      acc.push({
        name: projects.title,
        tasks: projects.tasks.length,
        color: projects.color,
      });
      return acc;
    }, [] as { name: string; tasks: number; color: string }[]);

    this.tasksByProjectChart = new Chart('tasksByProjectChart', {
      type: 'doughnut',
      data: {
        labels: projectData.map((project: { name: any }) => project.name),
        datasets: [
          {
            label: 'Tarefas por Projeto',
            data: projectData.map((project: { tasks: any }) => project.tasks),
            backgroundColor: projectData.map(
              (project: { color: any }) => project.color
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
        },
      },
    });
  }

  loadTotalTasksChart(tasks: any[]) {
    const taskStatusData = tasks.reduce((acc, task) => {
      if (
        acc.filter((item: { status: any }) => item.status == task.status.name)
          .length == 0
      ) {
        acc.push({
          status: task.status.name,
          count: tasks.filter((t) => t.statusId == task.statusId).length,
          color: task.status.color,
        });
      }

      return acc;
    }, [] as { status: string; count: number; color: string }[]);

    this.totalTasksChart = new Chart('totalTasksChart', {
      type: 'doughnut',
      data: {
        labels: taskStatusData.map((status: { status: any }) => status.status),
        datasets: [
          {
            label: 'Status das Tarefas',
            data: taskStatusData.map((status: { count: any }) => status.count),
            backgroundColor: taskStatusData.map(
              (status: { color: any }) => status.color
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
        },
      },
    });
  }

  public isOverdueTask(task: TaskEntity): boolean {
    const currentDate = new Date();
    return new Date(task.dueDate!) < currentDate && !task.isCompleted;
  }

  public isDueSoonTask(task: TaskEntity): boolean {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate!);
    const diffInTime = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 5 && diffInDays > 0 && !task.isCompleted;
  }

  loadTeamPerformanceChart(teams: any[], tasks: any[]) {
    const teamData = teams.reduce((acc, team) => {
      const userIds = new Set(
        team.userTeams.map((ut: UserTeamEntity) => ut.userId)
      );

      acc.push({
        name: team.name,
        completed: tasks.filter(
          (t) => userIds.has(t.assignedToUserId) && t.isCompleted
        ).length,
        pending: tasks.filter(
          (t: TaskEntity) =>
            !this.isDueSoonTask(t) && userIds.has(t.assignedToUserId)
        ).length,
        late: tasks.filter(
          (t: TaskEntity) =>
            this.isOverdueTask(t) && userIds.has(t.assignedToUserId)
        ).length,
        toByLate: tasks.filter(
          (t: TaskEntity) =>
            this.isDueSoonTask(t) && userIds.has(t.assignedToUserId)
        ).length,
      });
      return acc;
    }, [] as { name: string; completed: number; pending: number; late: number; toByLate: number }[]);

    this.teamChart = new Chart('teamPerformanceChart', {
      type: 'bar',
      data: {
        labels: teamData.map((team: { name: any }) => team.name),
        datasets: [
          {
            label: 'Tarefas Concluídas',
            data: teamData.map((team: { completed: any }) => team.completed),
            backgroundColor: '#A4D65E', // Verde Pastel
          },
          {
            label: 'Tarefas Pendentes',
            data: teamData.map((team: { pending: any }) => team.pending),
            backgroundColor: '#FFD700', // Amarelo Pastel
          },
          {
            label: 'Tarefas à Beira de Atraso',
            data: teamData.map((team: { toByLate: any }) => team.toByLate),
            backgroundColor: '#FFB347', // Laranja Pastel
          },
          {
            label: 'Tarefas Atrasadas',
            data: teamData.map((team: { late: any }) => team.late),
            backgroundColor: '#FF6961', // Vermelho Pastel
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }

  loadMemberPerformanceChart(users: any[], tasks: any[]) {
    const memberData = users.reduce((acc, user) => {
      acc.push({
        name: user.name,
        completed: tasks.filter(
          (t) => t.assignedToUserId == user.id && t.isCompleted
        ).length,
        pending: tasks.filter(
          (t: TaskEntity) =>
            !this.isDueSoonTask(t) && t.assignedToUserId == user.id
        ).length,
        late: tasks.filter(
          (t: TaskEntity) =>
            this.isOverdueTask(t) && t.assignedToUserId == user.id
        ).length,
        toByLate: tasks.filter(
          (t: TaskEntity) =>
            this.isDueSoonTask(t) && t.assignedToUserId == user.id
        ).length,
      });
      return acc;
    }, [] as { name: string; completed: number; pending: number; late: number; toByLate: number }[]);

    this.memberChart = new Chart('memberPerformanceChart', {
      type: 'bar',
      data: {
        labels: memberData.map((member: { name: any }) => member.name),
        datasets: [
          {
            label: 'Tarefas Concluídas',
            data: memberData.map(
              (member: { completed: any }) => member.completed
            ),
            backgroundColor: '#A4D65E', // Verde Pastel
          },
          {
            label: 'Tarefas Pendentes',
            data: memberData.map((member: { pending: any }) => member.pending),
            backgroundColor: '#FFD700', // Amarelo Pastel
          },
          {
            label: 'Tarefas à Beira de Atraso',
            data: memberData.map(
              (member: { toByLate: any }) => member.toByLate
            ),
            backgroundColor: '#FFB347', // Laranja Pastel
          },
          {
            label: 'Tarefas Atrasadas',
            data: memberData.map((member: { late: any }) => member.late),
            backgroundColor: '#FF6961', // Vermelho Pastel
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }
}
