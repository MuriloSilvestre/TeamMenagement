import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEntity } from '../entities/task.entity';
import { TaskService } from '../service/task.service';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { ModalCrudService } from '../../shared/services/modal-crud.service';
import { ProjectCrudComponent } from '../../project/views/project-crud/project-crud.component';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { DropdownComponent } from '../../shared/views/dropdown/dropdown.component';
import { CalendarComponent } from '../../shared/views/calendar/calendar.component';
import { KanbanBoardComponent } from '../../shared/views/kanban-board/kanban-board.component';
import { TaskCrudComponent } from './task-crud/task-crud.component';
import { PaginadorListComponent } from '../../shared/views/paginador-list/paginador-list.component';
import { ProjectStatusService } from '../../shared/services/projectStatus.service';
import { ProjectStatusEntity } from '../../shared/entities/projectStatus.entity';

interface KanbanItem {
  id: number;
  title: string;
  date: string;
  color: string;
  status: string;
}

interface KanbanColumn {
  id: number;
  title: string;
  color: string;
  items: KanbanItem[];
}

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ProjectCrudComponent,
    HeaderContentComponent,
    DropdownComponent,
    CalendarComponent,
    KanbanBoardComponent,
    TaskCrudComponent,
    PaginadorListComponent,
  ],
})
export class TaskComponent implements OnInit {
  public tasks!: TaskEntity[];
  public filteredTasks: TaskEntity[] = [];
  public calendarTasks: {
    id: number;
    date: Date;
    name: string;
    color: string;
    status: string;
  }[] = [];
  public paginatedTask: {
    Id: number;
    Titulo: string;
    Status: string;
    Fim: string;
  }[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalPages: number = 0;
  public months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  public years: number[] = [];
  public selectedStatus: string = 'all';
  public selectedDueDate!: string | null;
  public selectedMonth: string = 'all';
  public selectedYear: string = 'all';
  public showModalCrud: boolean = false;
  public selectedTaskId: number = 0;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  public token: any;

  projectId: string = '';
  viewType: string = '';

  kanbanColumns: KanbanColumn[] = [];

  constructor(
    private readonly taskService: TaskService,
    private projectStatusService: ProjectStatusService,
    private tokenService: TokenstorageService,
    private modalCrudService: ModalCrudService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      this.viewType = params['tipo'];
      this.loadElements();
      this.populateYears();
    });
  }

  private loadElements(): void {
    this.token = this.tokenService.getUser();

    this.taskService.list(+this.projectId, this.token.userId).subscribe({
      next: (resData) => {
        this.tasks = resData;
        this.filteredTasks = this.tasks;
        if (this.viewType != 'kanban') {
          if (this.viewType == 'list') {
            this.totalPages = Math.ceil(this.tasks.length / this.itemsPerPage);
            this.updatePaginatorTasks();
          } else {
            this.updateCalendarTasks();
          }
        } else {
          this.updateKanbanTasks();
        }
      },
      error: (error: Error) => {
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.taskService.isFetching.set(false);
      },
    });
  }

  public remove(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.loadElements(); // Reload tasks after deletion
        this.resetFilters(); // Reset filters after deletion
      },
      error: (error: Error) => {
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.taskService.isFetching.set(false);
      },
    });
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  private populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 1; year++) {
      this.years.push(year);
    }
  }

  public applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task: TaskEntity) => {
      const matchesStatus = this.matchStatus(task);
      const matchesDueDate = this.matchDueDate(task);
      const matchesMonth = this.matchMonth(task);
      const matchesYear = this.matchYear(task);
      return matchesStatus && matchesDueDate && matchesMonth && matchesYear;
    });

    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updateCalendarTasks();
    this.updatePaginatorTasks();
    this.updateKanbanTasks();
  }

  private matchStatus(task: TaskEntity): boolean {
    switch (this.selectedStatus) {
      case 'completed':
        return task.isCompleted;
      case 'pending':
        return (
          !task.isCompleted && !this.isOverdue(task) && !this.isDueSoon(task)
        );
      case 'dueSoon':
        return this.isDueSoon(task);
      case 'overdue':
        return this.isOverdue(task);
      default:
        return true;
    }
  }

  private matchDueDate(task: TaskEntity): boolean {
    if (this.selectedDueDate) {
      const dueDate = new Date(task.dueDate!).toISOString().split('T')[0];
      return dueDate === this.selectedDueDate;
    }
    return true;
  }

  private matchMonth(task: TaskEntity): boolean {
    if (this.selectedMonth !== 'all') {
      const taskMonth = new Date(task.dueDate!).toLocaleString('default', {
        month: 'long',
      });
      return taskMonth.toLowerCase() === this.selectedMonth.toLowerCase();
    }
    return true;
  }

  private matchYear(task: TaskEntity): boolean {
    if (this.selectedYear !== 'all') {
      const taskYear = new Date(task.dueDate!).getFullYear();
      return taskYear.toString() === this.selectedYear;
    }
    return true;
  }

  public resetFilters(): void {
    this.selectedStatus = 'all';
    this.selectedDueDate = null;
    this.selectedMonth = 'all';
    this.selectedYear = 'all';
    this.filteredTasks = this.tasks;
    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);

    this.updateCalendarTasks();
    this.updatePaginatorTasks();
    this.updateKanbanTasks();
  }

  public nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatorTasks();
    }
  };

  public prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatorTasks();
    }
  };

  private updatePaginatorTasks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTask = this.filteredTasks.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Fim: new Date(item.dueDate!).toLocaleDateString(),
        Status: item.isCompleted
          ? 'Concluído'
          : this.isDueSoon(item)
          ? 'Atrasar'
          : this.isOverdue(item)
          ? 'Atrazado'
          : 'Pendente',
        Titulo: item.title,
      });
      return acc;
    }, [] as { Id: number; Titulo: string; Status: string; Fim: string }[]);
  }

  private updateCalendarTasks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.calendarTasks = this.filteredTasks.reduce((acc, item) => {
      acc.push({
        id: item.id!,
        date: new Date(item.dueDate!),
        status: item.isCompleted
          ? 'Concluído'
          : this.isDueSoon(item)
          ? 'Atrasar'
          : this.isOverdue(item)
          ? 'Atrazado'
          : 'Pendente',
        color: item.color,
        name: item.title,
      });
      return acc;
    }, [] as { id: number; date: Date; name: string; color: string; status: string }[]);
  }

  private updateKanbanTasks(): void {
    this.projectStatusService.getByProject(+this.projectId).subscribe({
      next: (resData: any) => {
        // Mapeia os status do projeto para criar as colunas do kanban
        this.kanbanColumns = resData.map((projectStatus: any) => ({
          id: projectStatus.statusId,
          title: projectStatus.status?.name || '',
          color: projectStatus.status?.color || '#FFFFFF',
          items: this.filteredTasks
            .filter((task) => task.statusId === projectStatus.statusId)
            .map((task) => ({
              id: task.id!,
              title: task.title,
              date: task.dueDate ? new Date(task.dueDate).toISOString() : '',
              color: task.color,
              status: task.isCompleted
                ? 'Concluído'
                : this.isDueSoon(task)
                ? 'Atrasar'
                : this.isOverdue(task)
                ? 'Atrazado'
                : 'Pendente',
            })),
        }));
      },
      error: (error: Error) => {
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.taskService.isFetching.set(false);
      },
    });
  }

  public isOverdue(task: TaskEntity): boolean {
    const currentDate = new Date();
    return new Date(task.dueDate!) < currentDate && !task.isCompleted;
  }

  public isDueSoon(task: TaskEntity): boolean {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate!);
    const diffInTime = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 5 && diffInDays > 0 && !task.isCompleted;
  }

  crud(taskId: number, action: string): void {
    this.modalCrudService.clearAction();
    this.selectedTaskId = taskId;
    this.modalCrudService.openModal();
    this.modalCrudService.setAction(action);
  }

  onItemMoved(event: {
    item: KanbanItem;
    sourceColumn: KanbanColumn;
    targetColumn: KanbanColumn;
  }): void {
    this.taskService
      .updateStatus(event.item.id, event.targetColumn.id)
      .subscribe({
        next: () => {},
        error: (error: Error) => {
          this.taskService.error.set(error.message);
          this.taskService.isFetching.set(false);
        },
        complete: () => {
          this.taskService.isFetching.set(false);
        },
      });
    event = {
      item: {} as KanbanItem,
      sourceColumn: {} as KanbanColumn,
      targetColumn: {} as KanbanColumn,
    };
  }

  public onModalClose(): void {
    this.loadElements();
  }
}
