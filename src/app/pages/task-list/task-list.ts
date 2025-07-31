import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-task-list',
  imports: [SharedModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

   data = [
    { ReminderName: 'John', age: 30, city: 'New York' },
    { ReminderName: 'Jane', age: 25, city: 'Los Angeles' },
    { ReminderName: 'Mike', age: 35, city: 'Chicago' }
  ];
  columns = ['Title', 'time', 'date', 'repeat', 'notes'];
  
}
