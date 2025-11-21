import { Component, computed, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../core/top-bar/top-bar';
import { BottomBar } from '../core/bottom-bar/bottom-bar';
import { Pet } from '../features/pet/pet';
import { Room } from '../features/rooms/room';
import { Tools } from '../features/tools/tools/tools';
import { Need } from '../features/pet/needs/need/need';
import { PetService } from '../services/pet-service';
import { LoggerService } from '../services/logger-service';
import { ProcessService } from '../services/process-service';
import { PetName } from '../features/pet/pet-name/pet-name';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, BottomBar, Pet, Room, Tools, Need, PetName],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private petService = inject(PetService);
  private loggerService = inject(LoggerService);
  private processService = inject(ProcessService);
  private processWorker!: Worker;

  protected isLightOff = computed(() => !this.petService.isLightOn());
  protected readonly title = signal('virtual-pet');
  protected backgroundImage = 'background.png';

  async ngOnInit() {
  this.loggerService.log('App started.');

  this.processWorker = new Worker(
    new URL('../workers/process-worker.worker.ts', import.meta.url),
    { type: 'module' }
  );

  this.processWorker.onmessage = async (event) => {
    if (event.data.action === 'check-processes') {
        await this.processService.setRunningApp();
    }
  };
}

  ngOnDestroy() {
    if (this.processWorker) {
      this.processWorker.terminate();
    }
  }
}
