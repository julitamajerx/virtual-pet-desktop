import { AnimationConfig } from '../interfeces/animation-config.interface';

type AnimationConfigType = Record<string, AnimationConfig>;

export const AnimationConfigs: AnimationConfigType = {
  idle: { path: 'assets/idle/Idle', frames: 4, frameDuration: 1000, loop: true },
  code: { path: 'assets/code/Code', frames: 3, frameDuration: 1000, loop: true },
  visualstudio: { path: 'assets/code/Code', frames: 3, frameDuration: 1000, loop: true },
  spotify: { path: 'assets/spotify/Spotify', frames: 3, frameDuration: 1000, loop: true },
  bledner: { path: 'assets/blender/Bledner', frames: 7, frameDuration: 1000, loop: true },
  steam: { path: 'assets/steam/Steam', frames: 3, frameDuration: 1000, loop: true },
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
  asleep: { path: 'assets/asleep/Asleep', frames: 1, frameDuration: 800, loop: true },
  wakeup: {
    path: 'assets/wakeup/Wakeup',
    frames: 1,
    frameDuration: 200,
    loop: false,
    returnFrames: 1,
  },
};
