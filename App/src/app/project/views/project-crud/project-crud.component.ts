import { TeamEntity } from './../../../team/entities/team.entity';
import { TeamProjectService } from './../../../shared/services/teamProject.service';
import { ProjectService } from '../../service/project.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalCrudComponent } from '../../../shared/views/modal-crud/modal-crud.component'; // Import ActivatedRoute
import { ModalCrudService } from '../../../shared/services/modal-crud.service';
import { TabComponent } from '../../../shared/views/tab/tab.component';
import { TabsComponent } from '../../../shared/views/tabs/tabs.component';
import { TeamProjectEntity } from '../../../shared/entities/teamProject.entity';
import { ListComponent } from '../../../shared/views/list/list.component';
import { TeamService } from '../../../team/services/team.service';
import { ProjectStatusEntity } from '../../../shared/entities/projectStatus.entity';
import { ProjectStatusService } from '../../../shared/services/projectStatus.service';
import { StatusEntity } from '../../../status/entities/status.entity';
import { StatusService } from '../../../status/services/status.service';

@Component({
  selector: 'app-project-crud',
  standalone: true,
  templateUrl: './project-crud.component.html',
  styleUrls: ['./project-crud.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalCrudComponent,
    TabComponent,
    TabsComponent,
    ListComponent,
  ],
})
export class ProjectCrudComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Input() projectId!: number;
  IsCompleted: string = '';
  teamId: number = 0;
  statusId: number = 0;
  action = this.modalCrudService.action;
  public teams: TeamEntity[] = [];
  public status: StatusEntity[] = [];

  public paginatedProjects: {
    Id: number;
    Titulo: string;
  }[] = [];

  public paginatedStatus: {
    Id: number;
    Titulo: string;
  }[] = [];

  constructor(
    public projectService: ProjectService,
    public teamProjectService: TeamProjectService,
    public projectStatusService: ProjectStatusService,
    public teamService: TeamService,
    public statusService: StatusService,
    private modalCrudService: ModalCrudService
  ) {}

  ngOnInit(): void {
    this.projectService.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.projectService.initializeForm();
    if (changes['projectId'] && changes['projectId'].currentValue > 0) {
      this.loadProject(changes['projectId'].currentValue);
      this.loadElements(changes['projectId'].currentValue);
    } else {
      this.clean();
    }
  }

  private loadProject(id: number) {
    this.projectService.getById(id).subscribe({
      next: (resData) => {
        this.projectService.fillForm(resData);
        this.IsCompleted = resData.isCompleted == true ? 'true' : 'false';
      },
      error: (error: Error) => {
        this.clean();
        this.projectService.error.set(error.message);
        this.projectService.isFetching.set(false);
      },
      complete: () => {
        this.projectService.isFetching.set(false);
      },
    });
  }

  public clean(): void {
    this.projectService.reset();
  }

  public ngOnSubmit() {
    this.projectService.basicForm.patchValue({
      isCompleted: this.IsCompleted == 'true' ? true : false,
      ...this.projectService.basicForm,
    });
    const controls = this.projectService.basicForm.controls;
    if (this.projectService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.projectService.submit(this.projectId);

    this.onCancel();
  }

  onCancel() {
    this.projectService.basicForm.reset();
    this.closeModal.emit();
    this.modalCrudService.closeModal();
    this.modalCrudService.clearAction();
  }

  private loadElements(projectId: number): void {
    this.teamProjectService.getByProject(projectId).subscribe({
      next: (resData) => {
        this.updatePaginatedProjects(resData);
      },
      error: (error: Error) => {
        this.teamProjectService.error.set(error.message);
        this.teamProjectService.isFetching.set(false);
      },
      complete: () => {
        this.teamProjectService.isFetching.set(false);
      },
    });

    this.projectStatusService.getByProject(projectId).subscribe({
      next: (resData) => {
        this.updatePaginatedStatus(resData);
      },
      error: (error: Error) => {
        this.projectStatusService.error.set(error.message);
        this.projectStatusService.isFetching.set(false);
      },
      complete: () => {
        this.projectStatusService.isFetching.set(false);
      },
    });

    this.teamService.getByProject(projectId).subscribe({
      next: (resData) => {
        this.teams = resData;
      },
      error: (error: Error) => {
        this.teamService.error.set(error.message);
        this.teamService.isFetching.set(false);
      },
      complete: () => {
        this.teamService.isFetching.set(false);
      },
    });

    this.statusService.getByProject(projectId).subscribe({
      next: (resData) => {
        this.status = resData;
      },
      error: (error: Error) => {
        this.statusService.error.set(error.message);
        this.statusService.isFetching.set(false);
      },
      complete: () => {
        this.statusService.isFetching.set(false);
      },
    });
  }

  public addEquipe() {
    let teamProject: TeamProjectEntity = {
      teamId: Number(this.teamId),
      projectId: Number(this.projectId),
    };
    this.teamProjectService.create(teamProject).subscribe({
      next: (resData) => {
        this.loadElements(this.projectId);
        this.teamId = 0;
      },
      error: (error: Error) => {
        this.teamProjectService.error.set(error.message);
        this.teamProjectService.isFetching.set(false);
      },
      complete: () => {
        this.teamProjectService.isFetching.set(false);
      },
    });
  }

  public addStatus() {
    let projectStatus: ProjectStatusEntity = {
      StatusId: Number(this.statusId),
      ProjectId: Number(this.projectId),
    };
    this.projectStatusService.create(projectStatus).subscribe({
      next: (resData) => {
        this.loadElements(this.projectId);
        this.statusId = 0;
      },
      error: (error: Error) => {
        this.projectStatusService.error.set(error.message);
        this.projectStatusService.isFetching.set(false);
      },
      complete: () => {
        this.projectStatusService.isFetching.set(false);
      },
    });
  }

  public onDeleteTeam(id: number) {
    this.teamProjectService.delete(id).subscribe({
      next: (resData) => {
        this.loadElements(this.projectId);
      },
      error: (error: Error) => {
        this.teamProjectService.error.set(error.message);
        this.teamProjectService.isFetching.set(false);
      },
      complete: () => {
        this.teamProjectService.isFetching.set(false);
      },
    });
  }

  public onDeleteStatus(id: number) {
    this.projectStatusService.delete(id).subscribe({
      next: (resData) => {
        this.loadElements(this.projectId);
      },
      error: (error: Error) => {
        this.projectStatusService.error.set(error.message);
        this.projectStatusService.isFetching.set(false);
      },
      complete: () => {
        this.projectStatusService.isFetching.set(false);
      },
    });
  }

  private updatePaginatedProjects(resData: TeamProjectEntity[]): void {
    this.paginatedProjects = resData.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Titulo: item.team!.name,
      });
      return acc;
    }, [] as { Id: number; Titulo: string }[]);
  }

  private updatePaginatedStatus(resData: ProjectStatusEntity[]): void {
    this.paginatedStatus = resData.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Titulo: item.status!.name,
      });
      return acc;
    }, [] as { Id: number; Titulo: string }[]);
  }
}
