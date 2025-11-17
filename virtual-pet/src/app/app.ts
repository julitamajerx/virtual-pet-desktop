import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../core/top-bar/top-bar';
import { BottomBar } from '../core/bottom-bar/bottom-bar';
import { Pet } from "../features/pet/pet";
import { Room } from "../features/rooms/room";
import { Tools } from "../features/tools/tools/tools";
import { Need } from '../features/pet/needs/need/need';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, BottomBar, Pet, Room, Tools, Need],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('virtual-pet');
}
