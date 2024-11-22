import { UserEntity } from '../../user/entities/user.entity';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { TokenstorageService } from '../service/tokenstorage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, take, tap, throwError } from 'rxjs';
import { SucessService } from '../../shared/services/sucess.service';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class AuthComponent implements OnInit {
  public isSuccessful: boolean = false;
  public isSignUpFailed: boolean = false;
  public errorMessage: string = '';
  public user!: UserEntity;

  constructor(
    public authService: AuthenticationService,
    private successService: SucessService,
    private errorService: ErrorService,
    private token: TokenstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.inicializaForm();
  }

  ForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }

  ngOnSubmit(): void {
    this.authService
      .login()
      .pipe(
        take(1),
        tap((res: any) => {
          if (res.authenticated == true) {
            this.successService.showSucess(res.message);
          } else {
            this.errorService.showError(res.message);
            throw throwError(() => new Error(res.message));
          }
        }),
        catchError((error) => {
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
          this.token.saveUser(resData);
          this.router.navigate(['/home']);
        },
        error: (error: Error) => {
          console.log(error);
          this.authService.error.set(error.message);
          this.authService.isFetching.set(false);
        },
        complete: () => {
          this.authService.isFetching.set(false);
        },
      });
  }
}
