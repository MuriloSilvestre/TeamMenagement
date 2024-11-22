import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEntity } from '../../../user/entities/user.entity';
import { ChatService } from '../../services/chat.service';
import { UserChatService } from '../../../shared/services/userChat.service';
import { UserService } from '../../../user/services/user.service';
import { ModalCrudService } from '../../../shared/services/modal-crud.service';
import { ModalCrudComponent } from '../../../shared/views/modal-crud/modal-crud.component';
import { TabsComponent } from '../../../shared/views/tabs/tabs.component';
import { TabComponent } from '../../../shared/views/tab/tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserChatEntity } from '../../../shared/entities/userChat.entity';
import { ListComponent } from '../../../shared/views/list/list.component';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';

@Component({
  selector: 'app-chat-crud',
  templateUrl: './chat-crud.component.html',
  styleUrls: ['./chat-crud.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalCrudComponent,
    TabsComponent,
    TabComponent,
    ReactiveFormsModule,
    ListComponent,
  ],
})
export class ChatCrudComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Input() chatId!: number;
  userId: number = 0;
  action = this.modalCrudService.action;
  public users: UserEntity[] = [];
  private Token: any;

  public paginatedChats: {
    Id: number;
    Nome: string;
  }[] = [];

  constructor(
    public chatService: ChatService,
    public userChatService: UserChatService,
    public userService: UserService,
    private tokenService: TokenstorageService,
    private modalCrudService: ModalCrudService
  ) {}

  ngOnInit(): void {
    this.chatService.initializeForm();
    this.Token = this.tokenService.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chatService.initializeForm();
    if (changes['chatId'] && changes['chatId'].currentValue > 0) {
      this.loadProject(changes['chatId'].currentValue);
      this.loadElements(changes['chatId'].currentValue);
    } else {
      this.clean();
    }
  }

  private loadProject(id: number) {
    this.chatService.getById(id).subscribe({
      next: (resData) => {
        this.chatService.fillForm(resData);
      },
      error: (error: Error) => {
        this.clean();
        this.chatService.error.set(error.message);
        this.chatService.isFetching.set(false);
      },
      complete: () => {
        this.chatService.isFetching.set(false);
      },
    });
  }

  public clean(): void {
    this.chatService.reset();
  }

  public ngOnSubmit() {
    const controls = this.chatService.basicForm.controls;
    if (this.chatService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.chatService.submit(this.chatId).subscribe({
      next: (resData) => {
        console.log(resData);
        this.userId = this.Token.userId;
        this.chatId = resData.id;
        this.addUser();
      },
      error: (error) => {
        console.error('Erro ao submeter:', error);
      },
    });
    this.onCancel();
  }

  onCancel() {
    this.chatService.basicForm.reset();
    this.closeModal.emit();
    this.modalCrudService.closeModal();
    this.modalCrudService.clearAction();
  }

  private loadElements(chatId: number): void {
    this.userChatService.getByChat(chatId).subscribe({
      next: (resData) => {
        this.updatePaginatedChat(resData);
      },
      error: (error: Error) => {
        this.userChatService.error.set(error.message);
        this.userChatService.isFetching.set(false);
      },
      complete: () => {
        this.userChatService.isFetching.set(false);
      },
    });

    this.userService.getByChat(chatId).subscribe({
      next: (resData) => {
        this.users = resData;
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
    let userChat: UserChatEntity = {
      userId: Number(this.userId),
      chatId: Number(this.chatId),
    };
    this.userChatService.create(userChat).subscribe({
      next: (resData) => {
        this.loadElements(this.chatId);
        this.userId = 0;
      },
      error: (error: Error) => {
        this.userChatService.error.set(error.message);
        this.userChatService.isFetching.set(false);
      },
      complete: () => {
        this.userChatService.isFetching.set(false);
      },
    });
  }

  public onDeleteUser(id: number) {
    this.userChatService.delete(id).subscribe({
      next: (resData) => {
        this.loadElements(this.chatId);
      },
      error: (error: Error) => {
        this.userChatService.error.set(error.message);
        this.userChatService.isFetching.set(false);
      },
      complete: () => {
        this.userChatService.isFetching.set(false);
      },
    });
  }

  private updatePaginatedChat(resData: UserChatEntity[]): void {
    this.paginatedChats = resData.reduce((acc, item) => {
      acc.push({
        Id: item.id!,
        Nome: item.user!.name,
      });
      return acc;
    }, [] as { Id: number; Nome: string }[]);
  }
}
