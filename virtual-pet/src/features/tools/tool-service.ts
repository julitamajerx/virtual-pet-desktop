import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private toolMap: Record<string, string> = {
    'kuchnia': 'jedzenie',
    'sypialnia': 'lampka',
  };

  getToolForRoom(roomName: string): string {
    return this.toolMap[roomName] ?? 'Brak';
  }
}
