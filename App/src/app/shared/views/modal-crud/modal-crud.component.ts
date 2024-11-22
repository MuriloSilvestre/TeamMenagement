import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { ModalCrudService } from '../../services/modal-crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-crud',
  standalone: true,
  imports: [HeaderContentComponent],
  templateUrl: './modal-crud.component.html',
  styleUrl: './modal-crud.component.css',
})
export class ModalCrudComponent implements AfterViewInit {
  @Input() title: string = '';
  @ViewChild('dialog', { static: true })
  dialogEl!: ElementRef<HTMLDialogElement>;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalCrudService) {}

  ngAfterViewInit(): void {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(
      (isOpen) => {
        if (isOpen) {
          this.dialogEl.nativeElement.showModal();
        } else {
          this.dialogEl.nativeElement.close();
        }
      }
    );
  }

  close(): void {
    this.modalService.closeModal();
    this.modalService.clearAction();
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
