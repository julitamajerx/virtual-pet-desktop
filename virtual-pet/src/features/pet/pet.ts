import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { AnimationService } from '../../services/animation-service';

@Component({
  selector: 'app-pet',
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
})
export class Pet {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private petService = inject(PetService);
  private animationService = inject(AnimationService);
  private canvas!: HTMLCanvasElement;

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = 200;
    this.canvas.height = 200;

    this.animationService.loadImages('assets/idle/Idle', 4);
    this.animationService.startAnimationLoop(this.canvas, 200, 200, 2000, true);
  }

  constructor() {
    effect(() => {
      const light = this.petService.isLightOn();
      const anim = this.petService.currentAnimation();

      if (!this.canvas) return;

      this.animationService.stopAnimation();

      switch (anim) {
        case 'idle':
          this.animationService
            .loadImages('assets/idle/Idle', 4)
            .then(() =>
              this.animationService.startAnimationLoop(this.canvas, 200, 200, 2000, true)
            );
          break;

        case 'fun':
          this.animationService
            .loadImages('assets/fun/Fun', 1)
            .then(() =>
              this.animationService.startAnimationLoop(this.canvas, 200, 200, 1000, false)
            );

          this.backToIdleAnimation(1000, 2);
          break;

        case 'eat':
          this.animationService
            .loadImages('assets/eat/Eat', 4)
            .then(() =>
              this.animationService.startAnimationLoop(this.canvas, 200, 200, 800, false)
            );

          this.backToIdleAnimation(800, 5);
          break;
        
        case 'sad':
          this.animationService
            .loadImages('assets/sad/Sad', 1)
            .then(() =>
              this.animationService.startAnimationLoop(this.canvas, 200, 200, 800, true)
            );

          this.backToIdleAnimation(800, 2);
          break;

          case 'angry':
          this.animationService
            .loadImages('assets/angry/Angry', 2)
            .then(() =>
              this.animationService.startAnimationLoop(this.canvas, 200, 200, 800, true)
            );

          this.backToIdleAnimation(800, 3);
          break;
      }
    });

    effect(() => {
      const light = this.petService.isLightOn();

      if (!this.canvas) return;

      if (!light) {
        this.animationService
          .loadImages('assets/sleep/Sleep', 1)
          .then(() => this.animationService.startAnimationLoop(this.canvas, 200, 200, 800, false)
        );

        setTimeout(() => {
          this.animationService
            .loadImages('assets/asleep/Asleep', 0)
            .then(() => this.animationService.startAnimationLoop(this.canvas, 200, 200, 800, true));
        }, 2000);
      } else {
        this.backToIdleAnimation(200, 3);
      }
    });
  }

  backToIdleAnimation(durationTime: number, frames: number) {
    const duration = frames * durationTime;
    setTimeout(() => {
      this.animationService.stopAnimation();
      this.animationService.loadImages('assets/idle/Idle', 4).then(() => {
        this.animationService.startAnimationLoop(this.canvas, 200, 200, 2000, true);
      });
    }, duration);
  }

  pet() {
    this.animationService.stopAnimation();

    this.animationService.loadImages('assets/fun/Fun', 1).then(() => {
      this.animationService.startAnimationLoop(this.canvas, 200, 200, 1000, false);

      this.petService.satisfyNeed('fun', 5);

      const funDuration = 3 * 1000;
      setTimeout(() => {
        this.animationService.stopAnimation();
        this.animationService.loadImages('assets/idle/Idle', 4).then(() => {
          this.animationService.startAnimationLoop(this.canvas, 200, 200, 2000, true);
        });
      }, funDuration);
    });
  }
}
