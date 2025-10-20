import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  template: `
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950"></div>
      <!-- Add more decorative elements if needed -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-teal-900/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-sky-900/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-4000"></div>
    </div>
  `,
  styles: [`
    .animate-pulse-slow {
      animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    @keyframes pulse-slow {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {}
