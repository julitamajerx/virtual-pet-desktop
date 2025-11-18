import { inject, Injectable } from '@angular/core';
import { PetService } from './pet-service';
import { ToolMap } from '../shared/types/tools-map.type';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private petService = inject(PetService);
  private toolMap: Record<string, string> = ToolMap;

  getToolForRoom(roomName: string): string {
    return this.toolMap[roomName] ?? 'None';
  }

  useTool(toolName: string) {
    switch (toolName) {
      case 'food':
        this.petService.satisfyNeed('hunger', 25);
        break;

      case 'light':
        this.petService.toggleLightInteraction();
        break;

      default:
        console.warn(`There's no tool.`);
    }
  }
}
