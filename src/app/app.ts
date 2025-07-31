import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableList } from './shared/shared';
import { SharedModule } from './shared/shared-module';
import { MaterialModule } from './coreModules/material.module';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');

   @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
