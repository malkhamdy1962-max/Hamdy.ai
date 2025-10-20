import { Injectable, signal } from '@angular/core';

export type Tool = 'chat' | 'law-comparator' | 'document-generator' | 'longform-generator' | 'tasks';

@Injectable({
  providedIn: 'root'
})
export class ToolStateService {
  activeTool = signal<Tool>('chat');

  setActiveTool(tool: Tool) {
    this.activeTool.set(tool);
  }
}
