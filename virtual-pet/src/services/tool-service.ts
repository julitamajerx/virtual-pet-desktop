import { inject, Injectable } from '@angular/core';
import { PetService } from './pet-service';
import { ToolMap } from '../shared/types/tools-map.type';
import { ToolsNames } from '../shared/enums/tools-name.enum';
import { NeedsNames } from '../shared/enums/needs-name.enum';
import { AnimationsNames } from '../shared/enums/animations-name.enum';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private petService = inject(PetService);
  private toolMap: Record<string, string> = ToolMap;

  public getToolForRoom(roomName: string): string {
    return this.toolMap[roomName] ?? 'None';
  }

  public useTool(toolName: string) {
    switch (toolName) {
      case ToolsNames.FOOD:
        this.petService.satisfyNeed(NeedsNames.HUNGER, 25);
        this.petService.playAnimation(AnimationsNames.EAT);
        break;

      case ToolsNames.LIGHT:
        this.petService.toggleLightInteraction(0.00463, 21600000);
        break;

      case ToolsNames.GAME:
        this.petService.satisfyNeed(NeedsNames.FUN, 30);
        this.petService.playAnimation(AnimationsNames.FUN);
        break;
    }
  }
}
