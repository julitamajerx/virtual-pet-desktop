import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoomService {
  readonly rooms = ['kuchnia', 'sypialnia'];
  public currentRoom = signal(0);
  private router = inject(Router);

  setCurrentRoom(roomNumber: number) {
    switch (roomNumber) {
      case 0:
        this.router.navigate([this.rooms[0]]);
        break;
      case 1:
        this.router.navigate([this.rooms[1]]);
        break;
    }
  }

  changeCurrentRoom() {
    if (this.currentRoom() === 1) {
      this.currentRoom.update((value) => (value = 0));
      this.setCurrentRoom(this.currentRoom());

      return;
    }

    this.currentRoom.update((value) => value + 1);
    this.setCurrentRoom(this.currentRoom());
  }
}
