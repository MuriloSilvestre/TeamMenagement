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
import { RoleEntity } from '../entities/role.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const ROLE_API = `${environment.apiUrl}api/role`;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<RoleEntity[]> {
    return this.http.get<RoleEntity[]>(`${ROLE_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar funções. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar funções.'));
      })
    );
  }

  public getById(id: number): Observable<RoleEntity> {
    return this.http.get<RoleEntity>(`${ROLE_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar função. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar função.'));
      })
    );
  }

  public getByContent(content: string): Observable<RoleEntity> {
    return this.http.get<RoleEntity>(`${ROLE_API}/content/${content}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar função pelo nome. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar função pelo nome.'));
      })
    );
  }

  private create(role: RoleEntity): Observable<RoleEntity> {
    return this.http.post<RoleEntity>(ROLE_API, role).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'Nova função foi cadastrada com sucesso.'
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
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  private update(role: RoleEntity, id: number): Observable<void> {
    role.id = id;
    return this.http.put<void>(`${ROLE_API}/${id}`, role).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A função foi atualizada com sucesso.');
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
    return this.http.delete(`${ROLE_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A função foi deletada com sucesso.');
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

  private save(role: RoleEntity, id?: number): Observable<any> {
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

  public initializeForm() {
    this.basicForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(role: RoleEntity) {
    this.basicForm.patchValue({
      id: role.id,
      name: role.name,
    });
  }
}
