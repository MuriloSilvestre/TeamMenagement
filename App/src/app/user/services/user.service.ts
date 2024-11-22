import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, throwError, take, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from '../../shared/services/error.service';
import { SucessService } from '../../shared/services/sucess.service';
import { UserEntity } from '../entities/user.entity';

const USER_API = `${environment.apiUrl}api/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public basicForm!: FormGroup;
  public passwordForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${USER_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuários. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar usuários.'));
      })
    );
  }

  public getById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${USER_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuário. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar usuário.'));
      })
    );
  }

  public getByTeam(teamId: number): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${USER_API}/team/${teamId}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuários por time. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar usuários por time.'));
      })
    );
  }

  public getByChat(chatId: number): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${USER_API}/chat/${chatId}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuários por chat. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar usuários por time.'));
      })
    );
  }

  public getByEmail(email: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${USER_API}/email=${email}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar usuário pelo e-mail. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar usuário pelo e-mail.')
        );
      })
    );
  }

  private create(user: UserEntity) {
    return this.http
      .post<UserEntity>(USER_API, user)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Novo usuário foi cadastrado com sucesso.'
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

  private update(user: UserEntity, id: number) {
    user.id = id;
    return this.http
      .put(`${USER_API}/${id}`, user)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'O usuário foi atualizado com sucesso.'
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
          this.reset(); // Limpa o formulário após a atualização
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
    return this.http.delete(`${USER_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('O usuário foi deletado com sucesso.');
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

  private save(user: UserEntity, id?: number) {
    if (id) {
      return this.update(user, id);
    } else {
      return this.create(user);
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
      name: ['', Validators.compose([Validators.required])],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])],
      newPassword: [''],
      roleId: [0, Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
    });
  }

  public initializeFormPassword() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(user: UserEntity) {
    this.basicForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      newPassword: '',
      roleId: user.roleId,
      color: user.color,
    });
  }

  public fillFormPassword(user: UserEntity, newPassword: string) {
    this.basicForm.patchValue({
      Id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      newPassword: newPassword,
      roleId: user.roleId,
      color: user.color,
    });
  }
}
