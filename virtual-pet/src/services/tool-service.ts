import { inject, Injectable } from '@angular/core';
import { PetService } from './pet-service';
import { ToolMap } from '../shared/types/tools-map.type';
import { ToolsNames } from '../shared/enums/tools-name.enum';

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
      case ToolsNames.food:
        this.petService.satisfyNeed('hunger', 25);
        this.petService.playAnimation('eat');
        break;

      case ToolsNames.light:
        this.petService.toggleLightInteraction();
        this.petService.playAnimation('sleep');
        break;

      case ToolsNames.game:
        this.petService.satisfyNeed('fun', 50);
        this.petService.playAnimation('fun');
        break;
    }
  }
}
