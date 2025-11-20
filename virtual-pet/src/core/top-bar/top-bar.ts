import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ElectronWindowService } from '../../services/electron-window-service';

@Component({
  selector: 'app-top-bar',
  imports: [DatePipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit {
  protected backgroundImage = 'topbar.png';
  protected exitImage = 'exit.png';
  protected time = new Date();
  private intervalId: number = 0;
  private electronWindowService = inject(ElectronWindowService);

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    Object.values(this.intervalId).forEach(clearInterval);
  }

  public closeApp() {
    this.electronWindowService.closeWindow();
  }
}
