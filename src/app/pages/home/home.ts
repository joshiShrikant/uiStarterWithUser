import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here
    console.log('Home component initialized');
    
  }

  // Additional methods can be added as needed

}
