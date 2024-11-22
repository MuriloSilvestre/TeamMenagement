import { UserService } from './../../../user/services/user.service';
import { TaskService } from '../../service/task.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalCrudComponent } from '../../../shared/views/modal-crud/modal-crud.component'; // Import ActivatedRoute
import { ModalCrudService } from '../../../shared/services/modal-crud.service';
import { TabsComponent } from '../../../shared/views/tabs/tabs.component';
import { TabComponent } from '../../../shared/views/tab/tab.component';
import { UserEntity } from '../../../user/entities/user.entity';

@Component({
  selector: 'app-task-crud',
  standalone: true,
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalCrudComponent,
    TabsComponent,
    TabComponent,
  ],
})
export class TaskCrudComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Input() taskId!: number;
  @Input() projectId!: number;
  IsCompleted: string = '';
  assignedToUserId: number = 0;
  action = this.modalCrudService.action;
  public users: UserEntity[] = [];

  constructor(
    public taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private modalCrudService: ModalCrudService
  ) {}

  ngOnInit(): void {
    this.taskService.initializeForm(this.projectId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.taskService.initializeForm(this.projectId);
    console.log(changes);
    if (changes['taskId'] && changes['taskId'].currentValue > 0) {
      this.loadTask(changes['taskId'].currentValue);
      this.loadElements();
    } else {
      this.clean();
      this.loadElements();
    }
  }

  private loadTask(id: number) {
    this.taskService.getById(id).subscribe({
      next: (resData) => {
        this.taskService.fillForm(resData, this.projectId);
        this.IsCompleted = resData.isCompleted == true ? 'true' : 'false';
      },
      error: (error: Error) => {
        this.clean();
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.taskService.isFetching.set(false);
      },
    });
  }

  private loadElements() {
    this.userService.list().subscribe({
      next: (resData) => {
        this.users = resData;
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

  public clean(): void {
    this.taskService.reset();
  }

  public ngOnSubmit() {
    this.taskService.basicForm.patchValue({
      isCompleted: this.IsCompleted == 'true' ? true : false,
      ...this.taskService.basicForm,
    });
    const controls = this.taskService.basicForm.controls;
    if (this.taskService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.taskService.submit(this.taskId);

    this.onCancel();
  }

  onCancel() {
    this.taskService.basicForm.reset();
    this.closeModal.emit();
    this.modalCrudService.closeModal();
    this.modalCrudService.clearAction();
  }
}
