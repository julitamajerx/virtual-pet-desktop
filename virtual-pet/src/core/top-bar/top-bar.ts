import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ElectronWindowService } from './electron-window-service';

@Component({
  selector: 'app-top-bar',
  imports: [DatePipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit {
  protected time = new Date();
  private electronWindowService = inject(ElectronWindowService);

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  closeApp() {
    this.electronWindowService.closeWindow();
  }
}
