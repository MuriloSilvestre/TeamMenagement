import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ModalCrudService } from '../../../shared/services/modal-crud.service';
import { ModalCrudComponent } from '../../../shared/views/modal-crud/modal-crud.component';
import { TabsComponent } from '../../../shared/views/tabs/tabs.component';
import { TabComponent } from '../../../shared/views/tab/tab.component';
import { RoleEntity } from '../../../role/entities/role.entity';
import { RoleService } from '../../../role/services/role.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalCrudComponent,
    TabsComponent,
    TabComponent,
  ],
})
export class UserCrudComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Input() userId!: number;
  action = this.modalCrudService.action;
  public Roles: RoleEntity[] = [];

  constructor(
    public userService: UserService,
    private modalCrudService: ModalCrudService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.userService.initializeForm();
    this.GetRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.initializeForm();
    if (changes['userId'] && changes['userId'].currentValue > 0) {
      this.GetRoles();
      this.loadTeam(changes['userId'].currentValue);
    } else {
      this.clean();
    }
  }

  private loadTeam(id: number) {
    this.userService.getById(id).subscribe({
      next: (resData) => {
        this.userService.fillForm(resData);
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
  }

  private GetRoles() {
    this.roleService.list().subscribe({
      next: (resData) => {
        this.Roles = resData;
      },
      error: (error: Error) => {
        this.roleService.error.set(error.message);
        this.roleService.isFetching.set(false);
      },
      complete: () => {
        this.roleService.isFetching.set(false);
      },
    });
  }

  public clean(): void {
    this.userService.reset();
  }

  public ngOnSubmit() {
    const controls = this.userService.basicForm.controls;
    if (this.userService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.userService.submit(this.userId);

    this.onCancel();
  }

  onCancel() {
    this.userService.basicForm.reset();
    this.closeModal.emit();
    this.modalCrudService.closeModal();
    this.modalCrudService.clearAction();
  }
}
