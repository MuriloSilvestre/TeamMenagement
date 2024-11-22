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
import { ChatEntity } from '../entities/chat.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const CHAT_API = `${environment.apiUrl}api/chat`;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<ChatEntity[]> {
    return this.http.get<ChatEntity[]>(`${CHAT_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar chats. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar chats.'));
      })
    );
  }

  public getById(id: number): Observable<ChatEntity> {
    return this.http.get<ChatEntity>(`${CHAT_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar chat. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar chat.'));
      })
    );
  }

  public getByUserId(userId: number): Observable<ChatEntity[]> {
    return this.http.get<ChatEntity[]>(`${CHAT_API}/user/${userId}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar chats do usuário. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar chats do usuário.'));
      })
    );
  }

  public getByName(name: string): Observable<ChatEntity> {
    return this.http.get<ChatEntity>(`${CHAT_API}/name/${name}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar chat pelo nome. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar chat pelo nome.'));
      })
    );
  }

  private create(chat: ChatEntity): Observable<ChatEntity> {
    return this.http.post<ChatEntity>(CHAT_API, chat).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('Novo chat foi cadastrado com sucesso.');
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

  private update(chat: ChatEntity, id: number): Observable<void> {
    chat.id = id;
    return this.http.put<void>(`${CHAT_API}/${id}`, chat).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('O chat foi atualizado com sucesso.');
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

  public delete(id: number) {
    return this.http.delete(`${CHAT_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('o Chat foi deletada com sucesso.');
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

  private save(chat: ChatEntity, id?: number): Observable<any> {
    if (id) {
      return this.update(chat, id);
    } else {
      return this.create(chat);
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

  public initializeForm() {
    this.basicForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(chat: ChatEntity) {
    this.basicForm.patchValue({
      Id: chat.id,
      name: chat.name,
      color: chat.color,
      CreateAt: chat.createAt,
      UpdateAt: chat.updateAt,
    });
  }
}
