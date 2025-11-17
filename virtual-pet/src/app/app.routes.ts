import { Routes } from '@angular/router';
import { Room } from '../features/rooms/room';
import { Room1 } from '../features/rooms/rooms/room1/room1';
import { Room2 } from '../features/rooms/rooms/room2/room2';

export const routes: Routes = [
    {path: "", component: Room1},
    {path: "kuchnia", component: Room1},
    {path: "sypialnia", component: Room2}
];
