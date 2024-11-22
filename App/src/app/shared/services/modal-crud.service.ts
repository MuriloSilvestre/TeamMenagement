import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalCrudService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  private _action = signal('');
  modalOpen$ = this.modalOpenSubject.asObservable();
  action = this._action.asReadonly();

  setAction(action: string) {
    console.log(action);
    this._action.set(action);
  }

  clearAction() {
    this._action.set('');
  }

  openModal(): void {
    this.modalOpenSubject.next(true);
  }

  closeModal(): void {
    this.modalOpenSubject.next(false);
  }
}
