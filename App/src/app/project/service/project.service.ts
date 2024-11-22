import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../shared/services/error.service';
import { SucessService } from '../../shared/services/sucess.service';
import { ProjectEntity } from '../entities/project.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalCrudService } from '../../shared/services/modal-crud.service';

const PROJECT_API = `${environment.apiUrl}api/project`;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);
  public projectId = 0;

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder,
    private modalCrudService: ModalCrudService
  ) {}

  public list(): Observable<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>(`${PROJECT_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar projetos. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar projetos.'));
      })
    );
  }

  public getById(id: number): Observable<ProjectEntity> {
    return this.http.get<ProjectEntity>(`${PROJECT_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar projeto. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar projeto.'));
      })
    );
  }

  public getProjectsByTeam(teamId: string): Observable<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>(`${PROJECT_API}/team/${teamId}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar projetos do time. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar projetos do time.'));
      })
    );
  }

  public getByContent(content: string): Observable<ProjectEntity> {
    return this.http
      .get<ProjectEntity>(`${PROJECT_API}/content/${content}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar projeto pelo conteúdo. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar projeto pelo conteúdo.')
          );
        })
      );
  }

  public create(project: ProjectEntity) {
    return this.http
      .post<ProjectEntity>(PROJECT_API, project)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Novo projeto foi cadastrado com sucesso.'
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
        next: (resData) => {
          this.fillForm(resData);
          this.projectId = resData.id!;
          this.modalCrudService.setAction('Editar');
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

  public update(project: ProjectEntity, id: number) {
    project.id = id;
    return this.http
      .put<ProjectEntity>(`${PROJECT_API}/${id}`, project)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'O projeto foi atualizado com sucesso.'
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
        next: (resData) => {
          this.fillForm(resData);
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
    return this.http.delete(`${PROJECT_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('O projeto foi deletado com sucesso.');
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

  private save(project: ProjectEntity, id?: number) {
    if (id) {
      return this.update(project, id);
    } else {
      return this.create(project);
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
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      isCompleted: [false],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      actualStartDate: [''],
      actualEndDate: [''],
      budget: ['', Validators.compose([Validators.required])],
      actualCost: [''],
      priority: [''],
      budgetDocument: [''],
    });
  }

  public fillForm(project: ProjectEntity) {
    const startDate = new Date(project.startDate).toISOString().split('T')[0];
    const endDate = new Date(project.endDate).toISOString().split('T')[0];
    const actualStartDate = new Date(project.actualStartDate)
      .toISOString()
      .split('T')[0];
    const actualEndDate = new Date(project.actualEndDate)
      .toISOString()
      .split('T')[0];

    this.basicForm.patchValue({
      id: project.id,
      title: project.title,
      description: project.description,
      color: project.color,
      isCompleted: project.isCompleted,
      startDate: startDate,
      endDate: endDate,
      actualStartDate: actualStartDate,
      actualEndDate: actualEndDate,
      budget: project.budget,
      actualCost: project.actualCost,
      priority: project.priority,
      budgetDocument: project.budgetDocument,
    });
  }
}
