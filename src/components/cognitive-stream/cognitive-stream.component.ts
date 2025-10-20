import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cognitive-stream',
  standalone: true,
  templateUrl: './cognitive-stream.component.html',
  styleUrls: ['./cognitive-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CognitiveStreamComponent {}