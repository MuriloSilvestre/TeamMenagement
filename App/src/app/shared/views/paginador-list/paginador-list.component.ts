import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-paginador-list',
  standalone: true,
  templateUrl: './paginador-list.component.html',
  styleUrls: ['./paginador-list.component.css'],
  imports: [CommonModule],
})
export class PaginadorListComponent implements OnInit {
  @Input() lista: any[] = [];
  @Input() propriedades: string[] = [];
  @Input() cssClasse: string = '';
  @Input() itensPorPagina: number = 5;
  @Input() acoesTemplate!: TemplateRef<any>;
  @Input() nextPageFunction!: () => void;
  @Input() prevPageFunction!: () => void;

  @Input() paginaAtual: number = 1;
  @Input() totalPaginas: number = 0;

  ngOnInit(): void {
    this.calcularTotalPaginas();
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.lista.length / this.itensPorPagina);
  }

  mudarPaginaAnterior() {
    if (this.prevPageFunction) {
      this.prevPageFunction();
    }
  }

  mudarPaginaProxima() {
    if (this.nextPageFunction) {
      this.nextPageFunction();
    }
  }

  get itensPaginados(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.lista.slice(inicio, fim);
  }

  getValor(item: any, propriedade: string): any {
    return item[propriedade];
  }
}
