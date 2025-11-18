import { Injectable } from '@angular/core';
import { ElectronWindowAPI } from '../shared/interfeces/window.interface';

@Injectable({
  providedIn: 'root',
})
export class ElectronWindowService {
  private isElectron = !!((window as any) && (window as any).electronAPI);

  public isElectronApp(): boolean {
    return this.isElectron;
  }

  public closeWindow(): void {
    const electronWindow = window as unknown as ElectronWindowAPI;

    if (this.isElectron) {
      electronWindow.electronAPI.closeApp();
    } else {
      console.warn('Application failed to close.');
    }
  }
}
