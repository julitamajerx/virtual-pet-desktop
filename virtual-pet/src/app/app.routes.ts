import { Routes } from '@angular/router';
import { Room } from '../features/rooms/room';
import { Room1 } from '../features/rooms/rooms/kitchen/room1';
import { Room2 } from '../features/rooms/rooms/room2/room2';

export const routes: Routes = [
  { path: '', component: Room1 },
  { path: 'kitchen', component: Room1 },
  { path: 'bedroom', component: Room2 },
];
