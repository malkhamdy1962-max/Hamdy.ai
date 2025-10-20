import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  taskService = inject(TaskService);
  newTaskText = '';

  addTask() {
    this.taskService.addTask(this.newTaskText);
    this.newTaskText = '';
  }
}