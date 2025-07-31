import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../coreModules/material.module';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-reminder',
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  templateUrl: './add-reminder.html',
  styleUrl: './add-reminder.css'
})
export class AddReminder implements OnChanges {
  @Input() reminder: Reminder = { id: '', title: '', date: '', time: '', repeat: 'once' };
  @Output() save = new EventEmitter<Reminder>();

  editMode = false;
  reminders: Reminder[] = [];

  formReminder: Reminder = { id: '', title: '', date: '', time: '', repeat: 'once' };

  constructor(private reminderService: ReminderService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {
    this.reminders = this.reminderService.getReminders();
  }
  ngOnInit() {
    // Check if we are editing an existing reminder
  this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const reminder1 = this.reminderService.getReminderById(id);
        console.log(reminder1);
        
        const reminder = this.reminderService.getReminders().find(r => r.id === id);
        if (reminder) {
          this.formReminder = { ...reminder };
        }
      }
    });

    //  this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   if (id) {
    //     this.http.get<Reminder>(`http://localhost:8080/api/reminders/${id}`).subscribe(reminder => {
    //       this.formReminder = reminder;
    //       this.editMode = true;
    //     });
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reminder']) {
      this.formReminder = { ...this.reminder };
    }
  }

  convertTo24Hr(timeStr: string): string {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


submitForm() {
  // Format date (ISO -> yyyy-MM-dd)
  const formattedDate = new Date(this.formReminder.date).toISOString().split('T')[0];

  // Convert time to 24hr format (optional - if backend expects HH:mm)
  const timeParts = this.convertTo24Hr(this.formReminder.time);

  const reminderPayload = {
    ...this.formReminder,
    date: formattedDate,
    time: timeParts,
  };

   console.log(this.formReminder);
    if (this.formReminder.id && this.formReminder.id !== '') {
      // Update existing reminder
      this.reminderService.updateReminder(this.formReminder);
      console.log('Updated Reminder:', this.formReminder);
      
    } else {
    this.formReminder.id = this.formReminder.id || Date.now().toString();
      this.reminderService.saveReminder(this.formReminder);
    }
   
    this.save.emit(this.formReminder);
    this.router.navigate(['/viewReminders']);
    this.formReminder = { id: '', title: '', date: '', time: '', repeat: 'once' }; // reset form

  // if (this.editMode) {
  //   this.http.put(`http://localhost:8080/api/reminders/${this.formReminder.id}`, reminderPayload)
  //     .subscribe(() => {
  //       this.resetForm();
  //     });
  // } else {
  //   this.http.post('http://localhost:8080/api/reminders', reminderPayload)
  //     .subscribe(() => {
  //       this.resetForm();
  //     });
  // }
}


   resetForm() {
    this.formReminder = { id: '', title: '', description: '', date: '', time: '', repeat: 'once' };
    this.editMode = false;
    this.router.navigate([], { queryParams: {} });
  }
}