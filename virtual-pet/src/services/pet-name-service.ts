import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetNameService {
  petName = signal<string>('');

  constructor() {
    this.loadName();
  }

  async loadName() {
    const name = await window.petStorage.getName();
    this.petName.set(name || '');
  }

  async saveName(name: string) {
    this.petName.set(name);
    await window.petStorage.setName(name);
  }
}
