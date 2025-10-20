import { Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TASK_KEY = 'hamdy_elmadrasa_tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>([]);
  private nextId = 1;

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    try {
      const storedTasks = localStorage.getItem(TASK_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks) as Task[];
        this.tasks.set(parsedTasks);
        this.nextId = parsedTasks.length > 0 ? Math.max(...parsedTasks.map(t => t.id)) + 1 : 1;
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    }
  }

  private saveTasks() {
    try {
      localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks()));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }

  addTask(text: string) {
    if (!text.trim()) return;
    const newTask: Task = { id: this.nextId++, text, completed: false };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    this.saveTasks();
  }

  removeTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasks();
  }
}
