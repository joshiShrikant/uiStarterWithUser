import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: false
})
export class Header {
 @Output() menuToggle = new EventEmitter<void>();

  onMenuClick() {
    this.menuToggle.emit();  // Emit event to parent
  }
}