import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ErrorService } from '../../shared/services/error.service';

const AUTH_API = `${environment.apiUrl}api/Home`;

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public isFetching = signal(false);
  public error = signal('');

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  public list() {
    return this.http.get<any>(`${AUTH_API}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }
}
