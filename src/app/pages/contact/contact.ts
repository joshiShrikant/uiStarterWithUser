import { Component } from '@angular/core';
import { MaterialModule } from '../../coreModules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule, MaterialModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

   contact = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    console.log('Contact Form Data:', this.contact);
    // You can integrate backend or email service here.
    alert('Thank you for contacting us!');
    this.contact = { name: '', email: '', message: '' }; // reset form
  }
}
