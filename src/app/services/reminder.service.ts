import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder.model';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private storageKey = 'reminders';

  getReminders(): Reminder[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveReminder(reminder: Reminder) {
    const reminders = this.getReminders();
    reminders.push(reminder);
    localStorage.setItem(this.storageKey, JSON.stringify(reminders));
  }

  deleteReminder(id: string) {
    const reminders = this.getReminders().filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(reminders));
  }

  updateReminder(updatedReminder: Reminder) {
    const reminders = this.getReminders().map(r => r.id === updatedReminder.id ? updatedReminder : r);
    localStorage.setItem(this.storageKey, JSON.stringify(reminders));
  }

  getReminderById(id: string): Reminder | undefined {
    return this.getReminders().find(r => r.id === id);
  }

}
