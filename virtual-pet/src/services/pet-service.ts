import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { NeedConfig, NeedsMap } from '../shared/types/needs-map.type';
import { NeedState } from '../shared/interfeces/need-state.interface';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  public currentAnimation = signal<'idle' | 'fun' | 'eat' | 'sleep' | 'sad' | 'angry' | null>(
    'idle'
  );

  public isLightOn = signal(true);
  private needs: Record<string, WritableSignal<number>> = NeedsMap;
  private decayIntervals: Record<string, number> = {};
  private readonly config: Record<string, { rateMs: number; amount: number }> = NeedConfig;
  private satisfactionIntervals: Record<string, number> = {};
  private needZeroTriggered: Record<string, boolean> = {};

  constructor() {
    this.startAllDecay();
  }

  private decayNeed(needName: string): void {
    const needSignal = this.needs[needName];
    if (!needSignal) return;

    const newLevel = Math.max(0, needSignal() - this.config[needName].amount);
    needSignal.set(newLevel);

    if (newLevel === 0 && !this.needZeroTriggered[needName]) {
      this.needZeroTriggered[needName] = true;
      this.playAnimation('sad');
    }

    if (newLevel > 0 && this.needZeroTriggered[needName]) {
      this.playAnimation('idle');
      this.needZeroTriggered[needName] = false;
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

        if (needName === 'sleep') {
          this.isLightOn.set(true);
        }
      }
    }, tickRateMs) as any;

    this.satisfactionIntervals[needName] = intervalId;

    if (needName === 'sleep') {
      this.isLightOn.set(false);
    }
  }

  public toggleLightInteraction(): void {
    const needName = 'sleep';
    const sleepLevel = this.needs[needName]();

    if (this.isLightOn()) {
      if (sleepLevel < 75) {
        this.satisfyNeedInTime(needName, 5, 30000);
      } else {
        this.playAnimation('angry');
      }
    } else {
      const intervalId = this.satisfactionIntervals[needName];
      if (intervalId) {
        clearInterval(intervalId);
        delete this.satisfactionIntervals[needName];
      }
      this.isLightOn.set(true);
    }
  }

  public playAnimation(name: 'idle' | 'fun' | 'eat' | 'sleep' | 'sad' | 'angry') {
    this.currentAnimation.set(null);
    queueMicrotask(() => this.currentAnimation.set(name));
  }

  ngOnDestroy() {
    Object.values(this.decayIntervals).forEach(clearInterval);

    Object.values(this.satisfactionIntervals).forEach(clearInterval);
  }
}
