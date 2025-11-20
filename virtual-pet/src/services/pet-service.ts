import { effect, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { NeedConfig, NeedsMap } from '../shared/types/needs-map.type';
import { NeedState } from '../shared/interfeces/need-state.interface';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  public currentAnimation = signal<
    'idle' | 'fun' | 'eat' | 'sleep' | 'sad' | 'angry' | 'asleep' | 'wakeup' | null
  >('idle');

  public anyNeedZero = signal(false);
  public isLightOn = signal(true);
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
      const isZero = this.anyNeedZero();
      const current = this.currentAnimation();
      const isSleeping = !this.isLightOn();

      if (isSleeping) return;

      if (isZero && current !== 'sad') {
        this.playAnimation('sad');
      }

      if (!isZero && current === 'sad') {
        this.playAnimation('idle');
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

        if (needName === 'sleep') {
          this.isLightOn.set(true);
          this.playAnimation('wakeup');
        }
      }
    }, tickRateMs) as any;

    this.satisfactionIntervals[needName] = intervalId;

    if (needName === 'sleep') {
      this.isLightOn.set(false);
      this.playAnimation('sleep');
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
      this.playAnimation('wakeup');
    }
  }

  public playAnimation(
    name: 'idle' | 'fun' | 'eat' | 'sleep' | 'sad' | 'angry' | 'asleep' | 'wakeup'
  ) {
    this.currentAnimation.set(name);
  }

  ngOnDestroy() {
    Object.values(this.decayIntervals).forEach(clearInterval);
    Object.values(this.satisfactionIntervals).forEach(clearInterval);
  }
}
