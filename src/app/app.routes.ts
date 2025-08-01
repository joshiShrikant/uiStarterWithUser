import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const appRoutes: Routes = [
  { path: '', component: Home },  // default
  {path: 'taskList', loadComponent: () => import('./pages/task-list/task-list').then(m => m.TaskList)},
  {path: 'viewReminders', loadComponent: () => import('./pages/view-reminders/view-reminders').then(m => m.ViewReminders)},
  {path: 'addReminder', loadComponent: () => import('./pages/add-reminder/add-reminder').then(m => m.AddReminder)},
  {path: 'editReminder', loadComponent: () => import('./pages/add-reminder/add-reminder').then(m => m.AddReminder)},
  {path: 'register', loadComponent: () => import('./user-login/register/register').then(m => m.Register)},
  {path: 'login', loadComponent: () => import('./user-login/login/login').then(m => m.Login)},
  {path: 'resetPassword', loadComponent: () => import('./user-login/reset-password/reset-password').then(m => m.ResetPassword)},
  {path: 'profile', loadComponent: () => import('./user-login/profile/profile').then(m => m.Profile)},
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
];