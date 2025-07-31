import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.html',
  styleUrl: './table-list.css',
  standalone: false
})
export class TableList {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
}
