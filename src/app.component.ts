import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './components/background/background.component';
import { ChatComponent } from './components/chat/chat.component';
import { CommandDialComponent } from './components/command-dial/command-dial.component';
import { SystemStatusComponent } from './components/system-status/system-status.component';
import { ToolStateService } from './services/tool-state.service';
import { LawComparatorComponent } from './components/law-comparator/law-comparator.component';
import { DocumentGeneratorComponent } from './components/document-generator/document-generator.component';
import { LongformGeneratorComponent } from './components/longform-generator/longform-generator.component';
import { TasksComponent } from './components/tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundComponent,
    ChatComponent,
    CommandDialComponent,
    SystemStatusComponent,
    LawComparatorComponent,
    DocumentGeneratorComponent,
    LongformGeneratorComponent,
    TasksComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  toolState = inject(ToolStateService);
}