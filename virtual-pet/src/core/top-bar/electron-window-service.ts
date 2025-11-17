// electron-window.service.ts
import { Injectable } from '@angular/core';

// Definicja interfejsu (żeby TypeScript znał window.electronAPI)
declare global {
  interface Window {
    electronAPI: {
      closeApp: () => void;
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class ElectronWindowService {
  private isElectron = !!(window && window.electronAPI);

  public isElectronApp(): boolean {
    return this.isElectron;
  }

  public closeWindow(): void {
    if (this.isElectron) {
      window.electronAPI.closeApp();
      console.log('Wysłano żądanie zamknięcia do głównego procesu Electrona.');
    } else {
      console.warn(
        'Metoda closeWindow() wywołana poza środowiskiem Electrona. (Aplikacja nie zostanie zamknięta)'
      );
    }
  }
}
