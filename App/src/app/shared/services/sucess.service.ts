import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SucessService {
  private _sucess = signal('');

  sucess = this._sucess.asReadonly();

  showSucess(message: string) {
    this._sucess.set(message);
  }

  clearSucess() {
    this._sucess.set('');
  }
}
