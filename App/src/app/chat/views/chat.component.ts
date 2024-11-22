import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChatEntity } from '../entities/chat.entity';
import { ChatService } from '../services/chat.service';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { ChatCrudComponent } from './chat-crud/chat-crud.component';
import { ModalCrudService } from '../../shared/services/modal-crud.service';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    HeaderContentComponent,
    ChatCrudComponent,
  ],
})
export class ChatComponent implements OnInit {
  public chats: ChatEntity[] = [];
  public selectedChat: ChatEntity | null = null;
  public activeChatId: number | null = null;
  public SelectedChatId: number = 0;
  public Token: any;

  constructor(
    private tokenService: TokenstorageService,
    private modalCrudService: ModalCrudService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.LoadElements();
  }

  LoadElements() {
    this.Token = this.tokenService.getUser();

    this.loadChats();
  }

  private loadChats() {
    this.chatService.getByUserId(this.Token.userId).subscribe({
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

  public Remove(id: number): void {
    this.chatService.delete(id).subscribe({
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

  SetValue(resData: ChatEntity[]) {
    this.chats = resData;
  }

  SetError(error: Error) {
    this.chatService.error.set(error.message);
    this.chatService.isFetching.set(false);
  }

  SetFetching() {
    this.chatService.isFetching.set(false);
  }

  onSelectChat(chat: ChatEntity) {
    this.activeChatId = chat.id!;
    this.selectedChat = chat;
  }

  public OnModalClose(): void {
    this.LoadElements();
  }

  Crud(projectId: number, action: string): void {
    this.modalCrudService.clearAction();
    this.SelectedChatId = projectId;
    this.modalCrudService.openModal();
    this.modalCrudService.setAction(action);
  }
}
