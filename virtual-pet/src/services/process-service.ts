import { Injectable, signal } from '@angular/core';
import { normalizeMap } from '../shared/types/normalizeMap.type';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {

  public runningApp = signal<string | null>(null);

  private readonly normalizeMap: Record<string, string> = normalizeMap;

  private normalize(name: string): string | null {
    const lower = name.toLowerCase();

    for (const key of Object.keys(this.normalizeMap)) {
      if (lower.includes(key.toLowerCase())) {
        return this.normalizeMap[key];
      }
    }
    return null;
  }

  public async getInterestingApps() {
    const processes = await window.system.getProcesses();

    return processes.filter((p) => this.normalize(p.name) !== null);
  }

  public async setRunningApp() {
    const apps = await this.getInterestingApps();
    

    if (apps.length > 0) {
      const normalized = this.normalize(apps[0].name)
      this.runningApp.set(null);

      this.runningApp.set(normalized);
    } else {
      this.runningApp.set(null);
    }
  }
}
