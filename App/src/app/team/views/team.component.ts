import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ModalCrudService } from '../../shared/services/modal-crud.service';
import { TeamEntity } from '../entities/team.entity';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { TeamCrudComponent } from './team-crud/team-crud.component';
import { PaginadorListComponent } from '../../shared/views/paginador-list/paginador-list.component';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderContentComponent,
    TeamCrudComponent,
    PaginadorListComponent,
  ],
})
export class TeamComponent implements OnInit {
  public teams!: TeamEntity[];
  public filteredTeams: TeamEntity[] = [];
  public paginatedTeams: {
    Id: number;
    Titulo: string;
    Usuarios: number;
  }[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 0;

  public showModalCrud: boolean = false;
  public selectedTeamId: number = 0;
  public token: any;

  constructor(
    private readonly teamService: TeamService,
    private modalCrudService: ModalCrudService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements(): void {
    this.teamService.list().subscribe({
      next: (resData) => {
        this.teams = resData;
        this.filteredTeams = this.teams;
        this.totalPages = Math.ceil(this.teams.length / this.itemsPerPage);
        this.updatePaginatedTeams();
      },
      error: (error: Error) => {
        this.teamService.error.set(error.message);
        this.teamService.isFetching.set(false);
      },
      complete: () => {
        this.teamService.isFetching.set(false);
      },
    });
  }

  public remove(id: number): void {
    this.teamService.delete(id).subscribe({
      next: () => {
        this.loadElements();
      },
      error: (error: Error) => {
        this.teamService.error.set(error.message);
        this.teamService.isFetching.set(false);
      },
      complete: () => {
        this.teamService.isFetching.set(false);
      },
    });
  }

  public nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTeams();
    }
  };

  public prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTeams();
    }
  };

  private updatePaginatedTeams(): void {
    this.paginatedTeams = this.filteredTeams.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Titulo: item.name,
        Usuarios: item.userTeams!.length,
      });
      return acc;
    }, [] as { Id: number; Titulo: string; Usuarios: number }[]);
  }

  crud(teamId: number, action: string): void {
    this.modalCrudService.clearAction();
    this.selectedTeamId = teamId;
    this.modalCrudService.openModal();
    this.modalCrudService.setAction(action);
  }

  public onModalClose(): void {
    this.loadElements();
  }
}
