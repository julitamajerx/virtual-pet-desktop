import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room-service';
import { ToolService } from '../../../services/tool-service';

@Component({
  selector: 'app-tools',
  imports: [],
  templateUrl: './tools.html',
  styleUrl: './tools.css',
})
export class Tools {
  private toolService = inject(ToolService);
  private roomService = inject(RoomService);

  currentRoomName = computed(() => this.roomService.rooms[this.roomService.currentRoom()]);

  currentToolName = computed(() => this.toolService.getToolForRoom(this.currentRoomName()));

  useCurrentTool() {
    const tool = this.currentToolName();
    this.toolService.useTool(tool);
  }
}
