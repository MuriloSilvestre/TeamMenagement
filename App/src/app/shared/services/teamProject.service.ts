import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from './error.service';
import { SucessService } from './sucess.service';
import { TeamProjectEntity } from '../entities/teamProject.entity';

const TEAM_PROJECT_API = `${environment.apiUrl}api/teamproject`;

@Injectable({
  providedIn: 'root',
})
export class TeamProjectService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public getById(id: number): Observable<TeamProjectEntity> {
    return this.http.get<TeamProjectEntity>(`${TEAM_PROJECT_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar projeto de equipe. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar projeto de equipe.'));
      })
    );
  }

  public getByTeam(teamId: number): Observable<TeamProjectEntity[]> {
    return this.http
      .get<TeamProjectEntity[]>(`${TEAM_PROJECT_API}/team/${teamId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar projetos da equipe. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar projetos da equipe.')
          );
        })
      );
  }

  public getByProject(projectId: number): Observable<TeamProjectEntity[]> {
    return this.http
      .get<TeamProjectEntity[]>(`${TEAM_PROJECT_API}/project/${projectId}`)
      .pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar projetos. Tente novamente mais tarde.'
          );
          return throwError(() => new Error('Erro ao buscar projetos.'));
        })
      );
  }

  public create(teamProject: TeamProjectEntity) {
    return this.http
      .post<TeamProjectEntity>(TEAM_PROJECT_API, teamProject)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Novo projeto de equipe foi cadastrado com sucesso.'
          );
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(() => new Error('Ocorreu um erro inesperado.'));
        })
      );
  }

  private update(teamProject: TeamProjectEntity, id: number) {
    return this.http
      .put(`${TEAM_PROJECT_API}/${id}`, teamProject)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'O projeto de equipe foi atualizado com sucesso.'
          );
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(() => new Error('Ocorreu um erro inesperado.'));
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
    return this.http.delete(`${TEAM_PROJECT_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'O projeto de equipe foi deletado com sucesso.'
        );
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(() => new Error('Ocorreu um erro inesperado.'));
      })
    );
  }

  private save(teamProject: TeamProjectEntity, id?: number) {
    if (id) {
      return this.update(teamProject, id);
    } else {
      return this.create(teamProject);
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
      teamId: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  public fillForm(teamProject: TeamProjectEntity) {
    this.basicForm.patchValue({
      Id: teamProject.id,
      teamId: teamProject.teamId,
      projectId: teamProject.projectId,
    });
  }
}
