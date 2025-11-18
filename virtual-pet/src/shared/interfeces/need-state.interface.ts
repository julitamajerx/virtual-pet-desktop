import { Signal } from '@angular/core';

export interface NeedState {
  level: Signal<number>;
  decayRateMs: number;
  decayAmount: number;
}
