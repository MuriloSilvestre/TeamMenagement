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
import { ModalCrudComponent } from '../../../shared/views/modal-crud/modal-crud.component'; // Import ActivatedRoute
import { ModalCrudService } from '../../../shared/services/modal-crud.service';
import { TabComponent } from '../../../shared/views/tab/tab.component';
import { TabsComponent } from '../../../shared/views/tabs/tabs.component';
import { TeamService } from '../../services/team.service';
import { UserTeamService } from '../../../shared/services/userTeam.service';
import { UserTeamEntity } from '../../../shared/entities/userTeam.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/services/user.service';
import { ListComponent } from '../../../shared/views/list/list.component';

@Component({
  selector: 'app-team-crud',
  standalone: true,
  templateUrl: './team-crud.component.html',
  styleUrls: ['./team-crud.component.css'],
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
export class TeamCrudComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Input() teamId!: number;
  action = this.modalCrudService.action;
  public Users: UserEntity[] = [];
  public userId: number = 0;
  public paginatedUsers: {
    Id: number;
    Nome: string;
  }[] = [];

  constructor(
    public teamService: TeamService,
    private modalCrudService: ModalCrudService,
    private userTeamService: UserTeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.teamService.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.teamService.initializeForm();
    if (changes['teamId'] && changes['teamId'].currentValue > 0) {
      this.loadTeam(changes['teamId'].currentValue);
      this.loadElements(changes['teamId'].currentValue);
    } else {
      this.clean();
    }
  }

  private loadTeam(id: number) {
    this.teamService.getById(id).subscribe({
      next: (resData) => {
        this.teamService.fillForm(resData);
      },
      error: (error: Error) => {
        this.clean();
        this.teamService.error.set(error.message);
        this.teamService.isFetching.set(false);
      },
      complete: () => {
        this.teamService.isFetching.set(false);
      },
    });
  }

  public clean(): void {
    this.teamService.reset();
  }

  public ngOnSubmit() {
    const controls = this.teamService.basicForm.controls;
    if (this.teamService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.teamService.submit(this.teamId);

    this.onCancel();
  }

  onCancel() {
    this.teamService.basicForm.reset();
    this.closeModal.emit();
    this.modalCrudService.closeModal();
    this.modalCrudService.clearAction();
  }

  private loadElements(teamId: number): void {
    this.userTeamService.getByTeam(teamId).subscribe({
      next: (resData) => {
        this.updatePaginatedUser(resData);
      },
      error: (error: Error) => {
        this.userTeamService.error.set(error.message);
        this.userTeamService.isFetching.set(false);
      },
      complete: () => {
        this.userTeamService.isFetching.set(false);
      },
    });

    this.userService.getByTeam(teamId).subscribe({
      next: (resData) => {
        this.Users = resData;
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

  public addUser() {
    let userTeam: UserTeamEntity = {
      teamId: Number(this.teamId),
      userId: Number(this.userId),
    };
    this.userTeamService.create(userTeam).subscribe({
      next: (resData) => {
        this.loadElements(this.teamId);
        this.teamId = 0;
      },
      error: (error: Error) => {
        this.userTeamService.error.set(error.message);
        this.userTeamService.isFetching.set(false);
      },
      complete: () => {
        this.userTeamService.isFetching.set(false);
      },
    });
  }

  private updatePaginatedUser(resData: UserTeamEntity[]): void {
    console.log(resData);
    this.paginatedUsers = resData.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Nome: item.user!.name,
      });
      return acc;
    }, [] as { Id: number; Nome: string }[]);
  }

  public onDeleteTeam(id: number) {
    this.userTeamService.delete(id).subscribe({
      next: (resData) => {
        this.loadElements(this.userId);
      },
      error: (error: Error) => {
        this.userTeamService.error.set(error.message);
        this.userTeamService.isFetching.set(false);
      },
      complete: () => {
        this.userTeamService.isFetching.set(false);
      },
    });
  }
}
