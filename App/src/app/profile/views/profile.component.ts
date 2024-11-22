import { ModalCrudService } from './../../shared/services/modal-crud.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { ProfileCrudComponent } from './profile-crud/profile-crud.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderContentComponent,
    ProfileCrudComponent,
  ],
})
export class ProfileComponent implements OnInit {
  public user!: UserEntity;
  public SelectedUserId: number = 0;
  public token: any;
  public mudarSenha: boolean = false;

  constructor(
    public router: Router,
    private modalCrudService: ModalCrudService,
    private Token: TokenstorageService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.Token.getUser();
    this.loadElements();
  }

  private loadElements(): void {
    if (this.token && this.token.userName) {
      this.userService.initializeFormPassword();

      this.userService.getByEmail(this.token.userName).subscribe({
        next: (resData) => {
          this.user = resData;
        },
        error: (error: Error) => {
          this.clean();
          this.userService.error.set(error.message);
          this.userService.isFetching.set(false);
        },
        complete: () => {
          this.userService.isFetching.set(false);
        },
      });
    } else {
      this.clean();
      this.userService.error.set('Token ou userName não encontrado.');
    }
  }

  public clean(): void {
    this.userService.reset();
  }

  public salvarNovaSenha(): void {
    if (this.userService.passwordForm.valid) {
      this.user.password = this.userService.passwordForm.get('password')?.value;
      this.userService.fillFormPassword(
        this.user,
        this.userService.passwordForm.get('newPassword')?.value
      );

      this.userService.submit(this.user.id);

      this.userService.passwordForm.reset();
    }
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
