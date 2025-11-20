import { effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { NeedConfig, NeedsMap } from '../shared/types/needs-map.type';
import { NeedState } from '../shared/interfeces/need-state.interface';
import { AnimationsNames } from '../shared/enums/animations-name.enum';
import { NeedsNames } from '../shared/enums/needs-name.enum';
import { ProcessService } from './process-service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  public currentAnimation = signal<AnimationsNames | null>(AnimationsNames.IDLE);

  public anyNeedZero = signal(false);
  public isLightOn = signal(true);

  private processService = inject(ProcessService);
  private needs: Record<string, WritableSignal<number>> = NeedsMap;
  private decayIntervals: Record<string, number> = {};
  private readonly config: Record<string, { rateMs: number; amount: number }> = NeedConfig;
  private satisfactionIntervals: Record<string, number> = {};

  constructor() {
    this.startAllDecay();

    effect(() => {
      const zero = Object.values(this.needs).some((level) => level() === 0);
      this.anyNeedZero.set(zero);
    });

    effect(() => {
      const firstApp = this.processService.runningApp();

      switch (firstApp) {
        case AnimationsNames.CODE:
          this.playAnimation(AnimationsNames.CODE);
          break;
        /* case AnimationsNames.VISUALSTUDIO:
          this.playAnimation(AnimationsNames.VISUALSTUDIO);
          break;
        case AnimationsNames.SPOTIFY:
          this.playAnimation(AnimationsNames.SPOTIFY);
          break;
        case AnimationsNames.BLENDER:
          this.playAnimation(AnimationsNames.BLENDER);
          break;
        case AnimationsNames.STEAM:
          this.playAnimation(AnimationsNames.STEAM);
          break; */
      }
    });

    effect(() => {
      const isZero = this.anyNeedZero();
      const current = this.currentAnimation();
      const isSleeping = !this.isLightOn();

      if (isSleeping) return;

      if (isZero && current !== AnimationsNames.SAD) {
        this.playAnimation(AnimationsNames.SAD);
      }

      if (!isZero && current === AnimationsNames.SAD) {
        this.playAnimation(AnimationsNames.IDLE);
      }
    });
  }

  private decayNeed(needName: string): void {
    const needSignal = this.needs[needName];
    if (!needSignal) return;

    const newLevel = Math.max(0, needSignal() - this.config[needName].amount);
    needSignal.set(newLevel);

    if (newLevel === 0 && this.decayIntervals[needName]) {
    }
  }

  private startAllDecay(): void {
    Object.keys(this.needs).forEach((needName) => {
      const config = this.config[needName];

      const intervalId = setInterval(() => {
        this.decayNeed(needName);
      }, config.rateMs) as any;

      this.decayIntervals[needName] = intervalId;
    });
  }

  public getNeedLevel(needName: string): Signal<number> {
    return this.needs[needName];
  }

  public satisfyNeed(needName: string, amount: number) {
    const needSignal = this.needs[needName];
    if (!needSignal) return;

    const newLevel = Math.min(100, needSignal() + amount);
    needSignal.set(newLevel);
  }

  public satisfyNeedInTime(needName: string, amountPerTick: number, durationMs: number): void {
    const needSignal = this.needs[needName];
    if (!needSignal) return;

    if (this.satisfactionIntervals[needName]) {
      return;
    }

    const tickRateMs = 1000;
    let timeElapsed = 0;

    const intervalId = setInterval(() => {
      const newLevel = Math.min(100, needSignal() + amountPerTick);
      needSignal.set(newLevel);

      timeElapsed += tickRateMs;

      if (timeElapsed >= durationMs || newLevel >= 100) {
        clearInterval(this.satisfactionIntervals[needName]);
        delete this.satisfactionIntervals[needName];

        if (needName === NeedsNames.SLEEP) {
          this.isLightOn.set(true);
          this.playAnimation(AnimationsNames.WAKEUP);
        }
      }
    }, tickRateMs) as any;

    this.satisfactionIntervals[needName] = intervalId;

    if (needName === NeedsNames.SLEEP) {
      this.isLightOn.set(false);
      this.playAnimation(AnimationsNames.SLEEP);
    }
  }

  public toggleLightInteraction(amountPerTick: number, durationMs: number): void {
    const needName = NeedsNames.SLEEP;
    const sleepLevel = this.needs[needName]();

    if (this.isLightOn()) {
      if (sleepLevel < 75) {
        this.satisfyNeedInTime(needName, amountPerTick, durationMs);
      } else {
        this.playAnimation(AnimationsNames.ANGRY);
      }
    } else {
      const intervalId = this.satisfactionIntervals[needName];
      if (intervalId) {
        clearInterval(intervalId);
        delete this.satisfactionIntervals[needName];
      }
      this.isLightOn.set(true);
      this.playAnimation(AnimationsNames.WAKEUP);
    }
  }

  public playAnimation(name: AnimationsNames) {
    this.currentAnimation.set(name);
  }

  ngOnDestroy() {
    Object.values(this.decayIntervals).forEach(clearInterval);
    Object.values(this.satisfactionIntervals).forEach(clearInterval);
  }
}
