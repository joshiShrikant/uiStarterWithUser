import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableList } from './shared/shared';
import { SharedModule } from './shared/shared-module';
import { MaterialModule } from './coreModules/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, SharedModule, MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  
  isLoggedIn = signal(false);
  protected readonly title = signal('my-app');

   @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
this.isLoggedIn.set(!!localStorage.getItem('jwt'));


  }
logout() {
  localStorage.removeItem('jwt');
  window.location.href = '/login'; // or use router.navigate(['/login']);
}

}
