import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ModalCrudService } from '../../shared/services/modal-crud.service';
import { PaginadorListComponent } from '../../shared/views/paginador-list/paginador-list.component';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { UserCrudComponent } from './user-crud/user-crud.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PaginadorListComponent,
    HeaderContentComponent,
    UserCrudComponent,
  ],
})
export class UserComponent implements OnInit {
  private users!: UserEntity[];
  private filteredUsers: UserEntity[] = [];
  public PaginatedUsers: {
    Id: number;
    Nome: string;
    Email: string;
  }[] = [];
  public CurrentPage: number = 1;
  public ItemsPerPage: number = 10;
  public TotalPages: number = 0;

  public SelectedUserId: number = 0;
  public token: any;

  constructor(
    private readonly userService: UserService,
    private modalCrudService: ModalCrudService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements(): void {
    this.userService.list().subscribe({
      next: (resData) => {
        this.users = resData;
        this.filteredUsers = this.users;
        this.TotalPages = Math.ceil(this.users.length / this.ItemsPerPage);
        this.updatePaginatedUsers();
      },
      error: (error: Error) => {
        this.userService.error.set(error.message);
        this.userService.isFetching.set(false);
      },
      complete: () => {
        this.userService.isFetching.set(false);
      },
    });
  }

  public Remove(id: number): void {
    this.userService.delete(id).subscribe({
      next: () => {
        this.loadElements();
      },
      error: (error: Error) => {
        this.userService.error.set(error.message);
        this.userService.isFetching.set(false);
      },
      complete: () => {
        this.userService.isFetching.set(false);
      },
    });
  }

  public NextPage = () => {
    if (this.CurrentPage < this.TotalPages) {
      this.CurrentPage++;
      this.updatePaginatedUsers();
    }
  };

  public PrevPage = () => {
    if (this.CurrentPage > 1) {
      this.CurrentPage--;
      this.updatePaginatedUsers();
    }
  };

  private updatePaginatedUsers(): void {
    this.PaginatedUsers = this.filteredUsers.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Nome: item.name,
        Email: item.email,
      });
      return acc;
    }, [] as { Id: number; Nome: string; Email: string }[]);
  }

  Crud(userId: number, action: string): void {
    this.modalCrudService.clearAction();
    this.SelectedUserId = userId;
    this.modalCrudService.openModal();
    this.modalCrudService.setAction(action);
  }

  public OnModalClose(): void {
    this.loadElements();
  }
}
