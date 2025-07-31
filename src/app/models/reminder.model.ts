export interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;       // e.g., '2025-07-27'
  time: string;       // e.g., '08:30'
  repeat: 'once' | 'daily';
}
