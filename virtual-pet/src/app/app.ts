import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../core/top-bar/top-bar';
import { BottomBar } from '../core/bottom-bar/bottom-bar';
import { Pet } from "../features/pet/pet";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, BottomBar, Pet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('virtual-pet');
}
