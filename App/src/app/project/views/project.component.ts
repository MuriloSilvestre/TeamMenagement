import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../shared/views/dropdown/dropdown.component';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectService } from '../service/project.service';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { PaginadorListComponent } from '../../shared/views/paginador-list/paginador-list.component';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { ProjectCrudComponent } from './project-crud/project-crud.component';
import { ModalCrudService } from '../../shared/services/modal-crud.service';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DropdownComponent,
    PaginadorListComponent,
    HeaderContentComponent,
    ProjectCrudComponent,
  ],
})
export class ProjectComponent implements OnInit {
  public Projects!: ProjectEntity[];
  public FilteredProjects: ProjectEntity[] = [];
  public PaginatedProjects: {
    Id: number;
    Titulo: string;
    Status: string;
    Inicio: string;
    Fim: string;
    Tarefas: number;
  }[] = [];
  public CurrentPage: number = 1;
  public ItemsPerPage: number = 10;
  public TotalPages: number = 0;
  public Months: string[] = [
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
  public Years: number[] = [];
  public SelectedStatus: string = 'all';
  public SelectedDueDate!: string | null;
  public SelectedMonth: string = 'all';
  public SelectedYear: string = 'all';
  public SelectedProjectId: number = 0;
  public Token: any;

  constructor(
    private readonly projectService: ProjectService,
    private tokenService: TokenstorageService,
    private modalCrudService: ModalCrudService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.LoadElements();
    this.PopulateYears();
  }

  private LoadElements(): void {
    this.Token = this.tokenService.getUser();

    if (this.Token.role == 'Administrador' || this.Token.role == 'Gerente') {
      this.GetProjectsManagement();
    } else {
      this.GetProjectsUser(this.Token.teamId);
    }
  }

  private GetProjectsManagement() {
    this.projectService.list().subscribe({
      next: (resData) => {
        this.SetValue(resData);
      },
      error: (error: Error) => {
        this.SetError(error);
      },
      complete: () => {
        this.SetFetching();
      },
    });
  }

  private GetProjectsUser(teamId: string) {
    this.projectService.getProjectsByTeam(teamId).subscribe({
      next: (resData) => {
        this.SetValue(resData);
      },
      error: (error: Error) => {
        this.SetError(error);
      },
      complete: () => {
        this.SetFetching();
      },
    });
  }

  SetValue(resData: ProjectEntity[]) {
    this.Projects = resData;
    this.FilteredProjects = resData;
    this.TotalPages = this.SetTotalPagesValue(resData.length);
    this.UpdatePaginatedProjects();
  }

  public Remove(id: number): void {
    this.projectService.delete(id).subscribe({
      next: () => {
        this.LoadElements();
        this.ResetFilters();
      },
      error: (error: Error) => {
        this.SetError(error);
      },
      complete: () => {
        this.SetFetching();
      },
    });
  }

  SetError(error: Error) {
    this.projectService.error.set(error.message);
    this.projectService.isFetching.set(false);
  }

  SetFetching() {
    this.projectService.isFetching.set(false);
  }

  private PopulateYears(): void {
    for (
      let year = new Date().getFullYear() - 10;
      year <= new Date().getFullYear() + 1;
      year++
    ) {
      this.Years.push(year);
    }
  }

  public ApplyFilters(): void {
    this.FilteredProjects = this.Projects.filter((project: ProjectEntity) => {
      return (
        this.MatchStatus(project) &&
        this.MatchDueDate(project) &&
        this.MatchMonth(project) &&
        this.MatchYear(project)
      );
    });

    this.TotalPages = this.SetTotalPagesValue(this.FilteredProjects.length);
    this.CurrentPage = 1;
    this.UpdatePaginatedProjects();
  }

  private MatchStatus(project: ProjectEntity): boolean {
    switch (this.SelectedStatus) {
      case 'completed':
        return project.isCompleted;
      case 'pending':
        return (
          !project.isCompleted &&
          !this.IsOverdue(project) &&
          !this.IsDueSoon(project)
        );
      case 'dueSoon':
        return this.IsDueSoon(project);
      case 'overdue':
        return this.IsOverdue(project);
      default:
        return true;
    }
  }

  private MatchDueDate(project: ProjectEntity): boolean {
    return this.SelectedDueDate
      ? new Date(project.endDate!).toISOString().split('T')[0] ===
          this.SelectedDueDate
      : true;
  }

  private MatchMonth(project: ProjectEntity): boolean {
    return this.SelectedMonth !== 'all'
      ? new Date(project.endDate!)
          .toLocaleString('default', {
            month: 'long',
          })
          .toLowerCase() === this.SelectedMonth.toLowerCase()
      : true;
  }

  private MatchYear(project: ProjectEntity): boolean {
    if (this.SelectedYear !== 'all') {
      return (
        new Date(project.endDate!).getFullYear().toString() ===
        this.SelectedYear
      );
    }
    return true;
  }

  public ResetFilters(): void {
    this.SelectedStatus = 'all';
    this.SelectedDueDate = null;
    this.SelectedMonth = 'all';
    this.SelectedYear = 'all';
    this.FilteredProjects = this.Projects;
    this.TotalPages = this.SetTotalPagesValue(this.FilteredProjects.length);
    this.UpdatePaginatedProjects();
  }

  SetTotalPagesValue(length: number) {
    return Math.ceil(length / this.ItemsPerPage);
  }

  public NextPage = () => {
    if (this.CurrentPage < this.TotalPages) {
      this.CurrentPage++;
      this.UpdatePaginatedProjects();
    }
  };

  public PrevPage = () => {
    if (this.CurrentPage > 1) {
      this.CurrentPage--;
      this.UpdatePaginatedProjects();
    }
  };

  private UpdatePaginatedProjects(): void {
    this.PaginatedProjects = this.FilteredProjects.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Titulo: item.title,
        Status: item.isCompleted
          ? 'Concluído'
          : this.IsDueSoon(item)
          ? 'Atrasar'
          : this.IsOverdue(item)
          ? 'Atrazado'
          : 'Pendente',
        Inicio: new Date(item.startDate!).toLocaleDateString(),
        Fim: new Date(item.endDate!).toLocaleDateString(),
        Tarefas: item.tasks ? item.tasks.length : 0,
      });
      return acc;
    }, [] as { Id: number; Titulo: string; Status: string; Inicio: string; Fim: string; Tarefas: number }[]);
  }

  public IsOverdue(project: ProjectEntity): boolean {
    const currentDate = new Date();
    return new Date(project.endDate!) < currentDate && !project.isCompleted;
  }

  public IsDueSoon(project: ProjectEntity): boolean {
    const currentDate = new Date();
    const dueDate = new Date(project.endDate!);
    const diffInTime = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 5 && diffInDays > 0 && !project.isCompleted;
  }

  Crud(projectId: number, action: string): void {
    this.modalCrudService.clearAction();
    this.SelectedProjectId = projectId;
    this.modalCrudService.openModal();
    this.modalCrudService.setAction(action);
  }

  public OnModalClose(): void {
    this.LoadElements();
  }
}
