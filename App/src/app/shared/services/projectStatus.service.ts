import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from './error.service';
import { SucessService } from './sucess.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectStatusEntity } from '../entities/projectStatus.entity';

const PROJECT_STATUS_API = `${environment.apiUrl}api/projectstatus`;

@Injectable({
  providedIn: 'root',
})
export class ProjectStatusService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public getById(id: number): Observable<ProjectStatusEntity> {
    return this.http
      .get<ProjectStatusEntity>(`${PROJECT_STATUS_API}/${id}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar status do projeto. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar status do projeto.')
          );
        })
      );
  }

  public getByProject(projectId: number): Observable<ProjectStatusEntity[]> {
    return this.http
      .get<ProjectStatusEntity[]>(`${PROJECT_STATUS_API}/project/${projectId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar status do projeto por ID do projeto. Tente novamente mais tarde.'
          );
          return throwError(
            () =>
              new Error('Erro ao buscar status do projeto por ID do projeto.')
          );
        })
      );
  }

  public create(projectStatus: ProjectStatusEntity) {
    return this.http
      .post<ProjectStatusEntity>(PROJECT_STATUS_API, projectStatus)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Novo status do projeto foi cadastrado com sucesso.'
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

  private update(projectStatus: ProjectStatusEntity, id: number) {
    projectStatus.id = id;
    return this.http
      .put(`${PROJECT_STATUS_API}/${id}`, projectStatus)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'O status do projeto foi atualizado com sucesso.'
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
    return this.http.delete(`${PROJECT_STATUS_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'O status do projeto foi deletado com sucesso.'
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

  private save(projectStatus: ProjectStatusEntity, id?: number) {
    if (id) {
      return this.update(projectStatus, id);
    } else {
      return this.create(projectStatus);
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
      projectId: [0, Validators.compose([Validators.required])],
      statusId: [0, Validators.compose([Validators.required])],
    });
  }

  public fillForm(projectStatus: ProjectStatusEntity) {
    this.basicForm.patchValue({
      id: projectStatus.id,
      projectId: projectStatus.ProjectId,
      statusId: projectStatus.StatusId,
      createAt: projectStatus.createAt,
      updateAt: projectStatus.updateAt,
    });
  }
}
