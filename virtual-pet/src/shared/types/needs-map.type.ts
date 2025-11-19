import { signal, WritableSignal } from '@angular/core';

type NeedConfigType = Record<string, { rateMs: number; amount: number }>;
type NeedMapType = Record<string, WritableSignal<number>>;

export const NeedConfig: NeedConfigType = {
  hunger: { rateMs: 6000, amount: 2 },
  fun: { rateMs: 4000, amount: 3 },
  sleep: { rateMs: 8000, amount: 20 },
};

export const NeedsMap: NeedMapType = {
  hunger: signal(100),
  fun: signal(100),
  sleep: signal(100),
};
