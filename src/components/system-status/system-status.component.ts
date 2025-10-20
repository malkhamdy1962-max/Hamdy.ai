import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-system-status',
  standalone: true,
  templateUrl: './system-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemStatusComponent {}