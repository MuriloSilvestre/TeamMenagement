import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { StatusService } from '../services/status.service';
import { SmallPaginadorListComponent } from '../../shared/views/small-paginador-list/small-paginador-list.component';
import { StatusEntity } from '../entities/status.entity';

@Component({
  selector: 'app-status',
  standalone: true,
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderContentComponent,
    SmallPaginadorListComponent,
  ],
})
export class StatusComponent implements OnInit {
  public action = signal('Salvar');
  public FilteredStatus: StatusEntity[] = [];
  public PaginatedStatus: {
    Id: number;
    Nome: string;
  }[] = [];
  public CurrentPage: number = 1;
  public ItemsPerPage: number = 7;
  public TotalPages: number = 0;

  constructor(public statusService: StatusService, public router: Router) {}

  ngOnInit(): void {
    this.statusService.initializeForm();
    this.LoadElements();
  }

  public onCancel(): void {
    this.statusService.reset();
  }

  public ngOnSubmit(): void {
    this.isFormValid();

    this.statusService.submit().subscribe({
      next: () => {
        this.LoadElements();
      },
      error: (error) => {
        console.error('Erro ao submeter:', error);
      },
    });
  }

  private isFormValid() {
    const controls = this.statusService.basicForm.controls;

    if (this.statusService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
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
    this.PaginatedStatus = this.FilteredStatus.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Nome: item.name,
      });
      return acc;
    }, [] as { Id: number; Nome: string }[]);
  }

  private LoadElements(): void {
    this.GetProjectsManagement();
  }

  private GetProjectsManagement() {
    this.statusService.list().subscribe({
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

  private SetValue(resData: StatusEntity[]) {
    this.FilteredStatus = resData;
    this.TotalPages = this.SetTotalPagesValue(resData.length);
    this.UpdatePaginatedProjects();
  }

  public Remove(id: number): void {
    this.statusService.delete(id).subscribe({
      next: () => {
        this.LoadElements();
      },
      error: (error: Error) => {
        this.SetError(error);
      },
      complete: () => {
        this.SetFetching();
      },
    });
  }

  private SetError(error: Error) {
    this.statusService.error.set(error.message);
    this.statusService.isFetching.set(false);
  }

  private SetFetching() {
    this.statusService.isFetching.set(false);
  }

  private SetTotalPagesValue(length: number) {
    return Math.ceil(length / this.ItemsPerPage);
  }

  public Crud(roleId: number, action: string): void {
    this.statusService.getById(roleId).subscribe({
      next: (resData) => {
        this.statusService.fillForm(resData);
        this.action = signal(action);
      },
      error: (error: Error) => {
        this.SetError(error);
      },
      complete: () => {
        this.SetFetching();
      },
    });
  }
}
