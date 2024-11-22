import {
  catchError,
  finalize,
  map,
  Observable,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../shared/services/error.service';
import { SucessService } from '../../shared/services/sucess.service';
import { MessageEntity } from '../entities/message.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const MESSAGE_API = `${environment.apiUrl}api/message`;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<MessageEntity[]> {
    return this.http.get<MessageEntity[]>(`${MESSAGE_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar mensagens. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar mensagens.'));
      })
    );
  }

  public getById(id: number): Observable<MessageEntity> {
    return this.http.get<MessageEntity>(`${MESSAGE_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar mensagem. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar mensagem.'));
      })
    );
  }

  public getByChatId(chatId: number): Observable<MessageEntity[]> {
    return this.http.get<MessageEntity[]>(`${MESSAGE_API}/chat/${chatId}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar mensagens do chat. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar mensagens do usuário.')
        );
      })
    );
  }

  public getByUserId(userId: number): Observable<MessageEntity[]> {
    return this.http.get<MessageEntity[]>(`${MESSAGE_API}/user/${userId}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar mensagens do usuário. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar mensagens do usuário.')
        );
      })
    );
  }

  public getByContent(content: string): Observable<MessageEntity> {
    return this.http
      .get<MessageEntity>(`${MESSAGE_API}/content/${content}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar mensagem pelo conteúdo. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar mensagem pelo conteúdo.')
          );
        })
      );
  }

  public create(message: MessageEntity) {
    return this.http.post<MessageEntity>(MESSAGE_API, message).pipe(
      take(1),
      tap(() => {}),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  public update(message: MessageEntity, id: number) {
    message.id = id;
    return this.http.put<MessageEntity>(`${MESSAGE_API}/${id}`, message).pipe(
      take(1),
      tap(() => {}),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  public delete(id: number) {
    return this.http.delete(`${MESSAGE_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A mensagem foi deletada com sucesso.');
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  private save(role: MessageEntity, id?: number): Observable<any> {
    if (id) {
      return this.update(role, id);
    } else {
      return this.create(role);
    }
  }

  get getBasicForm() {
    return this.basicForm.controls;
  }

  public reset() {
    this.basicForm.reset();
  }

  public submit(id?: number): Observable<any> {
    return this.save(this.basicForm.value, id).pipe(
      tap(() => {
        this.reset();
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isFetching.set(false);
        return throwError(() => error);
      }),
      finalize(() => {
        this.isFetching.set(false);
      })
    );
  }

  public initializeForm(chatId: number) {
    this.basicForm = this.fb.group({
      chatId: [chatId, Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(message: MessageEntity, chatId: number) {
    this.basicForm.patchValue({
      id: message.id,
      content: message.content,
      chatId: chatId,
    });
  }
}
