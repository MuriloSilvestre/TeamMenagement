import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { SucessService } from '../../../services/sucess.service';

@Component({
  selector: 'app-sucess-modal',
  standalone: true,
  templateUrl: './sucess-modal.component.html',
  styleUrl: './sucess-modal.component.css',
  imports: [ModalComponent],
})
export class SucessModalComponent {
  title = input<string>();
  message = input<string>();
  private sucessService = inject(SucessService);

  onClearSucess() {
    this.sucessService.clearSucess();
  }
}
