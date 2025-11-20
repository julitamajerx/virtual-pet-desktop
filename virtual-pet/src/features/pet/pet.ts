import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { AnimationService } from '../../services/animation-service';

interface AnimationConfig {
  path: string;
  frames: number;
  frameDuration: number;
  loop: boolean;
  returnFrames?: number;
}

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
})
export class Pet {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private petService = inject(PetService);
  private animationService = inject(AnimationService);
  private canvas!: HTMLCanvasElement;
  private readonly spriteW = 200;
  private readonly spriteH = 200;

  private readonly animationConfigs: Record<string, AnimationConfig> = {
    idle: { path: 'assets/idle/Idle', frames: 4, frameDuration: 1000, loop: true },
    fun: { path: 'assets/fun/Fun', frames: 1, frameDuration: 1000, loop: false, returnFrames: 2 },
    eat: { path: 'assets/eat/Eat', frames: 4, frameDuration: 800, loop: false, returnFrames: 5 },
    sad: { path: 'assets/sad/Sad', frames: 1, frameDuration: 800, loop: true },
    angry: {
      path: 'assets/angry/Angry',
      frames: 2,
      frameDuration: 800,
      loop: false,
      returnFrames: 3,
    },
    sleep: {
      path: 'assets/sleep/Sleep',
      frames: 1,
      frameDuration: 800,
      loop: false,
      returnFrames: 3,
    },
    asleep: { path: 'assets/asleep/Asleep', frames: 0, frameDuration: 800, loop: true },
    wakeup: {
      path: 'assets/wakeup/Wakeup',
      frames: 1,
      frameDuration: 200,
      loop: false,
      returnFrames: 3,
    },
  };

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.spriteW;
    this.canvas.height = this.spriteH;

    const initialConfig = this.animationConfigs['idle'];
    this.animationService
      .loadImages(initialConfig.path, initialConfig.frames)
      .then(() =>
        this.animationService.startAnimationLoop(
          this.canvas,
          this.spriteW,
          this.spriteH,
          initialConfig.frameDuration,
          initialConfig.loop
        )
      );
  }

  constructor() {
    effect(() => {
      const animName = this.petService.currentAnimation();
      if (!animName || !this.canvas) return;

      this.handleAnimationChange(animName);
    });
  }

  private handleAnimationChange(animName: string): void {
    const config = this.animationConfigs[animName];
    if (!config) return;

    this.animationService.stopAnimation();

    this.animationService.loadImages(config.path, config.frames).then(() => {
      this.animationService.startAnimationLoop(
        this.canvas,
        this.spriteW,
        this.spriteH,
        config.frameDuration,
        config.loop
      );

      if (animName === 'sleep') {
        setTimeout(() => {
          this.handleAnimationChange('asleep');
        }, 2000);
      }

      if (!config.loop && config.returnFrames) {
        const durationMs = config.returnFrames * config.frameDuration;

        setTimeout(() => {
          if (animName === 'wakeup') {
            this.petService.playAnimation('idle');
          } else if (this.petService.isLightOn()) {
            this.petService.playAnimation('idle');
          }
        }, durationMs);
      }
    });
  }

  pet() {
    this.petService.satisfyNeed('fun', 5);
    this.petService.playAnimation('fun');
  }
}
