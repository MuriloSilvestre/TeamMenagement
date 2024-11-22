import { UserEntity } from '../../user/entities/user.entity';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ErrorService } from '../../shared/services/error.service';

const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public formularioBasico!: FormGroup;
  public isFetching = signal(false);
  public error = signal('');

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private fb: FormBuilder
  ) {
    this.inicializaForm();
  }

  submit() {
    return this.login();
  }

  inicializaForm() {
    this.formularioBasico = this.fb.group({
      email: [, Validators.compose([Validators.required])],
      password: [, Validators.compose([Validators.required])],
    });
  }

  preencheFormulario(user: UserEntity) {
    this.formularioBasico.patchValue({
      email: user.email,
      password: user.password,
    });
  }

  login() {
    this.isFetching.set(true);

    return this.http
      .post<UserEntity>(`${AUTH_API}api/Login`, this.formularioBasico.value)
      .pipe(
        map((resData) => resData),
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

  forgotpassword(password: string, confirmarpassword: string): Observable<any> {
    return this.http.post(AUTH_API + 'forgotpassword', {
      password,
    });
  }
}
