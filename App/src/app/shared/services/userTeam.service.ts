import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from './error.service';
import { SucessService } from './sucess.service';
import { UserTeamEntity } from '../entities/userTeam.entity';

const USER_TEAM_API = `${environment.apiUrl}api/userteam`;

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private errorService: ErrorService,
    private successService: SucessService,
    private fb: FormBuilder
  ) {}

  public getByTeam(teamId: number): Observable<UserTeamEntity[]> {
    return this.http
      .get<UserTeamEntity[]>(`${USER_TEAM_API}/team/${teamId}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar usuários por time. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar usuários por time.')
          );
        })
      );
  }

  public getByUser(userId: number): Observable<UserTeamEntity[]> {
    return this.http
      .get<UserTeamEntity[]>(`${USER_TEAM_API}/user/${userId}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Erro ao buscar times do usuário. Tente novamente mais tarde.'
          );
          return throwError(
            () => new Error('Erro ao buscar times do usuário.')
          );
        })
      );
  }

  public getById(id: number): Observable<UserTeamEntity> {
    return this.http.get<UserTeamEntity>(`${USER_TEAM_API}/${id}`).pipe(
      take(1),
      map((resData) => resData),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Erro ao buscar associação de usuário e time. Tente novamente mais tarde.'
        );
        return throwError(
          () => new Error('Erro ao buscar associação de usuário e time.')
        );
      })
    );
  }

  public create(userTeam: UserTeamEntity) {
    return this.http.post<UserTeamEntity>(USER_TEAM_API, userTeam).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'Nova associação foi cadastrada com sucesso.'
        );
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () => new Error('Erro inesperado ao cadastrar a associação.')
        );
      })
    );
  }

  private update(userTeam: UserTeamEntity, id: number) {
    return this.http
      .put(`${USER_TEAM_API}/${id}`, userTeam)
      .pipe(
        take(1),
        tap(() => {
          this.successService.showSucess(
            'A associação foi atualizada com sucesso.'
          );
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(
            () => new Error('Erro inesperado ao atualizar a associação.')
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
    return this.http.delete(`${USER_TEAM_API}/${id}`).pipe(
      take(1),
      tap(() => {
        this.successService.showSucess(
          'A associação foi deletada com sucesso.'
        );
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () => new Error('Erro inesperado ao deletar a associação.')
        );
      })
    );
  }

  private save(userTeam: UserTeamEntity, id?: number) {
    if (id) {
      return this.update(userTeam, id);
    } else {
      return this.create(userTeam);
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
      userId: ['', Validators.compose([Validators.required])],
      teamId: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(userTeam: any) {
    this.basicForm.patchValue({
      userId: userTeam.userId,
      teamId: userTeam.teamId,
    });
  }
}
