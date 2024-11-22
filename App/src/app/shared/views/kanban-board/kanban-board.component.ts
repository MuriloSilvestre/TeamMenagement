import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface KanbanColumn {
  id: number;
  title: string;
  color: string;
  items: KanbanItem[];
}

interface KanbanItem {
  id: number;
  title: string;
  date: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent {
  @Input() columns: KanbanColumn[] = [];
  @Input() acoesTemplate!: TemplateRef<any>;

  @Output() itemMoved = new EventEmitter<{
    item: KanbanItem;
    sourceColumn: KanbanColumn;
    targetColumn: KanbanColumn;
  }>();

  private draggedItem!: KanbanItem;
  private sourceColumn!: KanbanColumn;

  dragStart(event: DragEvent, item: KanbanItem, column: KanbanColumn): void {
    this.draggedItem = item;
    this.sourceColumn = column;
    event.dataTransfer?.setData('text', item.id.toString());
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, targetColumn: KanbanColumn): void {
    event.preventDefault();
    if (this.draggedItem && this.sourceColumn !== targetColumn) {
      // Remove o item da coluna de origem e adiciona na coluna de destino
      this.sourceColumn.items = this.sourceColumn.items.filter(
        (item) => item !== this.draggedItem
      );
      targetColumn.items.push({
        ...this.draggedItem,
        id: targetColumn.id,
        color: targetColumn.color,
        status: targetColumn.title,
      });

      // Emite o evento para o componente pai
      this.itemMoved.emit({
        item: this.draggedItem,
        sourceColumn: this.sourceColumn,
        targetColumn: targetColumn,
      });

      // Limpa as variáveis temporárias
      this.draggedItem = undefined!;
      this.sourceColumn = undefined!;
    }
  }
  onDragOver(event: Event) {
    event.preventDefault();
  }
}
