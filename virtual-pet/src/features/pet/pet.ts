import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet-service';
import { AnimationService } from '../../services/animation-service';
import { AnimationsNames } from '../../shared/enums/animations-name.enum';
import { NeedsNames } from '../../shared/enums/needs-name.enum';
import { AnimationConfig } from '../../shared/interfeces/animation-config.interface';
import { AnimationConfigs } from '../../shared/types/animations-map.type';

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

  private readonly animationConfigs: Record<string, AnimationConfig> = AnimationConfigs;

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.spriteW;
    this.canvas.height = this.spriteH;

    const initialConfig = this.animationConfigs[AnimationsNames.IDLE];
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

      if (animName === AnimationsNames.SLEEP) {
        setTimeout(() => {
          this.handleAnimationChange(AnimationsNames.ASLEEP);
        }, 2000);
      }

      if (!config.loop && config.returnFrames) {
        const durationMs = config.returnFrames * config.frameDuration;

        setTimeout(() => {
          if (animName === AnimationsNames.WAKEUP) {
            this.petService.playAnimation(AnimationsNames.IDLE);
          } else if (this.petService.isLightOn()) {
            this.petService.playAnimation(AnimationsNames.IDLE);
          }
        }, durationMs);
      }
    });
  }

  public pet() {
    this.petService.satisfyNeed(NeedsNames.FUN, 5);
    this.petService.playAnimation(AnimationsNames.FUN);
  }
}
