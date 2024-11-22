import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../shared/services/error.service';
import { SucessService } from '../../shared/services/sucess.service';
import { TaskEntity } from '../entities/task.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const TASK_API = `${environment.apiUrl}api/task`;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(projectId: number = 0, userId: number): Observable<TaskEntity[]> {
    return this.http
      .get<TaskEntity[]>(`${TASK_API}/project/${projectId}/user/${userId}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar tarefas. Tente novamente mais tarde.'
          );
          return throwError(() => new Error('Erro ao buscar tarefas.'));
        })
      );
  }

  public getById(id: number): Observable<TaskEntity> {
    return this.http.get<TaskEntity>(`${TASK_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar tarefa. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar tarefa.'));
      })
    );
  }

  public getByUserId(userId: number): Observable<TaskEntity[]> {
    return this.http.get<TaskEntity[]>(`${TASK_API}/user/${userId}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar tarefas do usuário. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar tarefas do usuário.')
        );
      })
    );
  }

  private create(task: TaskEntity) {
    return this.http
      .post<TaskEntity>(TASK_API, task)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Nova tarefa foi cadastrada com sucesso.'
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

  private update(task: TaskEntity, id: number) {
    task.id = id;
    return this.http
      .put(`${TASK_API}/${id}`, task)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'A tarefa foi atualizada com sucesso.'
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

  public updateStatus(id: number, statusId: number) {
    let task = { id: id, statusId: statusId };
    console.log({ id: id, statusId: statusId });
    return this.http.put(`${TASK_API}/Status/${id}`, task).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A tarefa foi movida com sucesso.');
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
    return this.http.delete(`${TASK_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A tarefa foi deletada com sucesso.');
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

  private save(task: TaskEntity, id?: number) {
    if (id) {
      return this.update(task, id);
    } else {
      return this.create(task);
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

  public initializeForm(projectId: number) {
    this.basicForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: [''],
      isCompleted: [false],
      dueDate: [''],
      statusId: [1, Validators.compose([Validators.required])],
      assignedToUserId: [0, Validators.compose([Validators.required])],
      projectId: projectId,
      color: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(task: TaskEntity, projectId: number) {
    const dueDate = new Date(task.dueDate!).toISOString().split('T')[0];

    this.basicForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      dueDate: dueDate,
      statusId: task.statusId,
      assignedToUserId: task.assignedToUserId,
      projectId: projectId,
      color: task.color,
    });
  }
}
