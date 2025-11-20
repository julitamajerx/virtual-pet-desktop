import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room-service';
import { ToolService } from '../../../services/tool-service';
import { ToolsNames } from '../../../shared/enums/tools-name.enum';

@Component({
  selector: 'app-tools',
  imports: [],
  templateUrl: './tools.html',
  styleUrl: './tools.css',
})
export class Tools {
  protected toolImage = '';
  private toolService = inject(ToolService);
  private roomService = inject(RoomService);

  currentRoomName = computed(() => this.roomService.rooms[this.roomService.currentRoom()]);

  currentToolName = computed(() => this.toolService.getToolForRoom(this.currentRoomName()));

  constructor() {
    effect(() => {
      const tool = this.currentToolName();
      switch (tool) {
        case ToolsNames.FOOD:
          this.toolImage = 'food.png';
          break;
        case ToolsNames.LIGHT:
          this.toolImage = 'sleep.png';
          break;
        case ToolsNames.GAME:
          this.toolImage = 'game.png';
          break;
        default:
          this.toolImage = '';
      }
    });
  }

  public useCurrentTool() {
    const tool = this.currentToolName();
    this.toolService.useTool(tool);
  }
}
