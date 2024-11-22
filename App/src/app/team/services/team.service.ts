import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../shared/services/error.service';
import { SucessService } from '../../shared/services/sucess.service';
import { TeamEntity } from '../entities/team.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const TEAM_API = `${environment.apiUrl}api/team`;

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public list(): Observable<TeamEntity[]> {
    return this.http.get<TeamEntity[]>(`${TEAM_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar equipes. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar equipes.'));
      })
    );
  }

  public getById(id: number): Observable<TeamEntity> {
    return this.http.get<TeamEntity>(`${TEAM_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar equipe. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar equipe.'));
      })
    );
  }

  public getByProject(projectId: number): Observable<TeamEntity[]> {
    return this.http.get<TeamEntity[]>(`${TEAM_API}/project/${projectId}`).pipe(
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

  public getByUser(userId: number): Observable<TeamEntity[]> {
    return this.http.get<TeamEntity[]>(`${TEAM_API}/user/${userId}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar equipes do usuário. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar equipes do usuário.')
        );
      })
    );
  }

  public getByContent(content: string): Observable<TeamEntity> {
    return this.http.get<TeamEntity>(`${TEAM_API}/content/${content}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar equipe pelo nome. Tente novamente mais tarde.'
        );
        return throwError(() => new Error('Erro ao buscar equipe pelo nome.'));
      })
    );
  }

  private create(team: TeamEntity) {
    return this.http
      .post<TeamEntity>(TEAM_API, team)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'Nova equipe foi cadastrada com sucesso.'
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

  private update(team: TeamEntity, id: number) {
    team.id = id;
    return this.http
      .put(`${TEAM_API}/${id}`, team)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'A equipe foi atualizada com sucesso.'
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
    return this.http.delete(`${TEAM_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess('A equipe foi deletada com sucesso.');
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

  private save(team: TeamEntity, id?: number) {
    if (id) {
      return this.update(team, id);
    } else {
      return this.create(team);
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
      description: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(team: TeamEntity) {
    this.basicForm.patchValue({
      id: team.id,
      name: team.name,
      description: team.description,
      color: team.color,
    });
  }
}
