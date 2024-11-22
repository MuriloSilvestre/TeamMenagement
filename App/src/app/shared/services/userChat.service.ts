import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from './error.service';
import { SucessService } from './sucess.service';
import { UserChatEntity } from '../entities/userChat.entity';

const USER_CHAT_API = `${environment.apiUrl}api/userchat`;

@Injectable({
  providedIn: 'root',
})
export class UserChatService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public getByChat(chatId: number): Observable<UserChatEntity[]> {
    return this.http
      .get<UserChatEntity[]>(`${USER_CHAT_API}/chat/${chatId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar usuários do chat. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar usuários do chat.')
          );
        })
      );
  }

  public getByUser(userId: number): Observable<UserChatEntity[]> {
    return this.http
      .get<UserChatEntity[]>(`${USER_CHAT_API}/user/${userId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar chats do usuário. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar chats do usuário.')
          );
        })
      );
  }

  public get(id: number): Observable<UserChatEntity> {
    return this.http.get<UserChatEntity>(`${USER_CHAT_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuário do chat. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar usuário do chat.'));
      })
    );
  }

  public create(userChat: UserChatEntity) {
    return this.http.post<UserChatEntity>(USER_CHAT_API, userChat).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'Novo usuário de chat foi cadastrado com sucesso.'
        );
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
            )
        );
      })
    );
  }

  private update(userChat: UserChatEntity, id: number) {
    return this.http
      .put(`${USER_CHAT_API}/${id}`, userChat)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'O usuário do chat foi atualizado com sucesso.'
          );
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(
            () =>
              new Error(
                'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
              )
          );
        })
      )
      .subscribe({
        next: () => {
          this.reset();
        },
        error: (error: Error) => {
          this.error.set(error.message);
          this.isFetching.set(false);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  public delete(id: number) {
    return this.http.delete(`${USER_CHAT_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'O usuário do chat foi deletado com sucesso.'
        );
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
            )
        );
      })
    );
  }

  private save(userChat: UserChatEntity, id?: number) {
    if (id) {
      return this.update(userChat, id);
    } else {
      return this.create(userChat);
    }
  }

  get getBasicForm() {
    return this.basicForm.controls;
  }

  public reset() {
    this.basicForm.reset();
  }

  public submit(id?: number) {
    return this.save(this.basicForm.value, id);
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      userId: [0, Validators.compose([Validators.required])],
      chatId: [0, Validators.compose([Validators.required])],
    });
  }

  public fillForm(userChat: UserChatEntity) {
    this.basicForm.patchValue({
      id: userChat.id,
      userId: userChat.userId,
      chatId: userChat.chatId,
      createAt: userChat.createAt,
      updateAt: userChat.updateAt,
    });
  }
}
