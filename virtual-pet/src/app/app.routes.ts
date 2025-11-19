import { Routes } from '@angular/router';
import { Room } from '../features/rooms/room';
import { Kitchen } from '../features/rooms/rooms/kitchen/kitchen';
import { Bedroom } from '../features/rooms/rooms/bedroom/bedroom';
import { Playroom } from '../features/rooms/rooms/playroom/playroom';

export const routes: Routes = [
  { path: '', component: Kitchen },
  { path: 'kitchen', component: Kitchen },
  { path: 'bedroom', component: Bedroom },
  { path: 'playroom', component: Playroom },
];
