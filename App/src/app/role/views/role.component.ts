import { RoleService } from './../services/role.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { PaginadorListComponent } from '../../shared/views/paginador-list/paginador-list.component';
import { SmallPaginadorListComponent } from '../../shared/views/small-paginador-list/small-paginador-list.component';
import { RoleEntity } from '../entities/role.entity';

@Component({
  selector: 'app-role',
  standalone: true,
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderContentComponent,
    SmallPaginadorListComponent,
  ],
})
export class RoleComponent implements OnInit {
  public action = signal('Salvar');
  public FilteredRole: RoleEntity[] = [];
  public PaginatedRole: {
    Id: number;
    Nome: string;
  }[] = [];
  public CurrentPage: number = 1;
  public ItemsPerPage: number = 7;
  public TotalPages: number = 0;

  constructor(public roleService: RoleService, public router: Router) {}

  ngOnInit(): void {
    this.roleService.initializeForm();
    this.LoadElements();
  }

  public onCancel(): void {
    this.roleService.reset();
  }

  public ngOnSubmit(): void {
    this.isFormValid();

    this.roleService.submit().subscribe({
      next: () => {
        this.LoadElements();
      },
      error: (error) => {
        console.error('Erro ao submeter:', error);
      },
    });
  }

  private isFormValid() {
    const controls = this.roleService.basicForm.controls;

    if (this.roleService.basicForm.invalid) {
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
    this.PaginatedRole = this.FilteredRole.reduce((acc, item) => {
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
    this.roleService.list().subscribe({
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

  private SetValue(resData: RoleEntity[]) {
    this.FilteredRole = resData;
    this.TotalPages = this.SetTotalPagesValue(resData.length);
    this.UpdatePaginatedProjects();
  }

  public Remove(id: number): void {
    this.roleService.delete(id).subscribe({
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
    this.roleService.error.set(error.message);
    this.roleService.isFetching.set(false);
  }

  private SetFetching() {
    this.roleService.isFetching.set(false);
  }

  private SetTotalPagesValue(length: number) {
    return Math.ceil(length / this.ItemsPerPage);
  }

  public Crud(roleId: number, action: string): void {
    this.roleService.getById(roleId).subscribe({
      next: (resData) => {
        this.roleService.fillForm(resData);
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
