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
import { StatusEntity } from '../entities/status.entity'; // Importe a entidade Status
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const STATUS_API = `${environment.apiUrl}api/status`;

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<StatusEntity[]> {
    return this.http.get<StatusEntity[]>(`${STATUS_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar status. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar status.'));
      })
    );
  }

  public getByProject(projectId: number): Observable<StatusEntity[]> {
    return this.http
      .get<StatusEntity[]>(`${STATUS_API}/project/${projectId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar equipes do projeto. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar equipes do projeto.')
          );
        })
      );
  }

  public getById(id: number): Observable<StatusEntity> {
    return this.http.get<StatusEntity>(`${STATUS_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar status. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar status.'));
      })
    );
  }

  public getByContent(content: string): Observable<StatusEntity> {
    return this.http.get<StatusEntity>(`${STATUS_API}/content/${content}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar status pelo conteúdo. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar status pelo conteúdo.')
        );
      })
    );
  }

  private create(status: StatusEntity): Observable<StatusEntity> {
    return this.http.post<StatusEntity>(STATUS_API, status).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('Novo status cadastrado com sucesso.');
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

  private update(status: StatusEntity, id: number): Observable<void> {
    status.id = id;
    return this.http.put<void>(`${STATUS_API}/${id}`, status).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('O status foi atualizado com sucesso.');
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
    return this.http.delete(`${STATUS_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('O status foi deletado com sucesso.');
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

  private save(status: StatusEntity, id?: number): Observable<any> {
    if (id) {
      return this.update(status, id);
    } else {
      return this.create(status);
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

  public fillForm(status: StatusEntity) {
    this.basicForm.patchValue({
      id: status.id,
      name: status.name,
      color: status.color,
    });
  }
}
