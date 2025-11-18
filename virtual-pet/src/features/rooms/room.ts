import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room-service';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room {
  private roomService = inject(RoomService);

  public changeCurrentRoom() {
    this.roomService.changeCurrentRoom();
  }
}
