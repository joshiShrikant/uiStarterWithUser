import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../coreModules/material.module';
import { Router, RouterModule } from '@angular/router';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-reminders',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    RouterModule],
  templateUrl: './view-reminders.html',
  styleUrl: './view-reminders.css'
})
export class ViewReminders implements OnInit, AfterViewInit{

  selectedReminder: Reminder = { id: '', title: '', date: '', time: '', repeat: 'once' };
  reminders: Reminder[] = [];
  dataSource = new MatTableDataSource<Reminder>();
  displayedColumns: string[] = ['title', 'description', 'date', 'time', 'repeat', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private reminderService: ReminderService,
    private router: Router,
    private http: HttpClient,
  ) {
    // this.reminders = this.reminderService.getReminders();
    // this.dataSource.data = this.reminders;
  }

  saveReminder(reminder: Reminder) {
    const existingIndex = this.reminders.findIndex(r => r.id === reminder.id);
    if (existingIndex !== -1) {
      this.reminders[existingIndex] = reminder;
    } else {
      this.reminders.push(reminder);
    }
    this.reminderService.saveReminder(reminder);
    this.reminders = this.reminderService.getReminders();
    this.selectedReminder = { id: '', title: '', date: '', time: '', repeat: 'once' }; // reset form
  }

  editReminder(reminder: Reminder) {
    this.selectedReminder = { ...reminder };
    this.router.navigate(['/editReminder'], { queryParams: { id: reminder.id } });

  }

  // deleteReminder(id: string) {
  //   this.reminderService.deleteReminder(id);
  //   this.reminders = this.reminderService.getReminders();
  // }

   deleteReminder(id: number) {
    this.http.delete(`http://localhost:8080/api/reminders/${id}`).subscribe(() => {
      this.loadReminders();
    });
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


    loadReminders() {
    this.http.get<Reminder[]>('http://localhost:8080/api/reminders').subscribe(data => {
      this.reminders = data;
      this.dataSource.data = this.reminders;
    });
  }

    ngOnInit() {
    this.loadReminders();
  }

}
