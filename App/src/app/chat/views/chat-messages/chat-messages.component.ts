import { TokenstorageService } from './../../../auth/service/tokenstorage.service';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatEntity } from '../../entities/chat.entity';
import { MessageEntity } from '../../entities/message.entity';
import { MessageService } from '../../services/message.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ChatMessagesComponent implements OnInit {
  @Input() chat: ChatEntity | null = null;
  messages: MessageEntity[] = [];
  public token: any;
  @ViewChild('container') containerRef!: ElementRef;

  constructor(
    public messageService: MessageService,
    public tokenstorageService: TokenstorageService
  ) {}

  ngOnInit() {
    if (this.chat) {
      this.LoadElements(this.chat.id!);
    }
    this.token = this.tokenstorageService.getToken();
    this.messageService.initializeForm(this.chat ? this.chat.id! : 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat'] && changes['chat'].currentValue != null) {
      this.LoadElements(this.chat?.id!);
      this.messageService.initializeForm(this.chat ? this.chat.id! : 0);
    }
  }

  LoadElements(id: number) {
    this.loadMessages(id);
  }

  private loadMessages(id: number) {
    this.messageService.getByChatId(id).subscribe({
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

  SetValue(resData: MessageEntity[]) {
    this.messages = resData;
    this.scrollToBottom();
  }

  SetError(error: Error) {
    this.messageService.error.set(error.message);
    this.messageService.isFetching.set(false);
  }

  SetFetching() {
    this.messageService.isFetching.set(false);
  }

  public ngOnSubmit(): void {
    this.isFormValid();

    this.messageService.basicForm.patchValue({
      chatId: this.chat?.id!,
      ...this.messageService.basicForm,
    });
    this.messageService.submit().subscribe({
      next: () => {
        this.LoadElements(this.chat?.id!);
        this.messageService.reset();
        this.messageService.initializeForm(this.chat ? this.chat.id! : 0);
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Erro ao submeter:', error);
      },
    });
  }

  private isFormValid() {
    const controls = this.messageService.basicForm.controls;

    if (this.messageService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.containerRef) {
        const container = this.containerRef.nativeElement;
        container.scrollTop = container.scrollHeight; // Scrolla para o final.
      }
    }, 1);
  }
}
