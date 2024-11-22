import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [CommonModule],
})
export class ListComponent implements OnInit {
  @Input() lista: any[] = [];
  @Input() propriedades: string[] = [];
  @Input() cssClasse: string = '';
  @Input() acoesTemplate!: TemplateRef<any>;

  ngOnInit(): void {}

  getValor(item: any, propriedade: string): any {
    return item[propriedade];
  }
}
