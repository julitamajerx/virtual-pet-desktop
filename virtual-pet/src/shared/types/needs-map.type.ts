import { signal, WritableSignal } from '@angular/core';
import { NeedsNames } from '../enums/needs-name.enum';

interface NeedConfigItem {
  rateMs: number;
  amount: number;
}

export type NeedConfigType = Record<NeedsNames, NeedConfigItem>;

export const NeedConfig: NeedConfigType = {
  [NeedsNames.HUNGER]: {
    rateMs: 7200000,
    amount: 1,
  },

  [NeedsNames.FUN]: {
    rateMs: 7200000,
    amount: 1,
  },

  [NeedsNames.SLEEP]: {
    rateMs: 25200000,
    amount: 1,
  },
};

export type NeedsMapType = Record<string, WritableSignal<number>>;

export const NeedsMap: NeedsMapType = {
  [NeedsNames.HUNGER]: signal(100),
  [NeedsNames.FUN]: signal(100),
  [NeedsNames.SLEEP]: signal(100),
};
