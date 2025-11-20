import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../core/top-bar/top-bar';
import { BottomBar } from '../core/bottom-bar/bottom-bar';
import { Pet } from '../features/pet/pet';
import { Room } from '../features/rooms/room';
import { Tools } from '../features/tools/tools/tools';
import { Need } from '../features/pet/needs/need/need';
import { PetService } from '../services/pet-service';
import { LoggerService } from '../services/logger-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, BottomBar, Pet, Room, Tools, Need],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private petService = inject(PetService);
  private loggerService = inject(LoggerService);

  protected isLightOff = computed(() => !this.petService.isLightOn());
  protected readonly title = signal('virtual-pet');
  protected backgroundImage = 'background.png';

  ngOnInit() {
    this.loggerService.log('App started.');
  }
}
