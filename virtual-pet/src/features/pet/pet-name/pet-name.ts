import { Component, inject } from '@angular/core';
import { PetNameService } from '../../../services/pet-name-service';

@Component({
  selector: 'app-pet-name',
  imports: [],
  templateUrl: './pet-name.html',
  styleUrl: './pet-name.css',
})
export class PetName {
  petNameService = inject(PetNameService);

  petName = this.petNameService.petName;

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 15) {
      input.value = input.value.slice(0, 15);
    }

    this.petNameService.saveName(input.value);
  }
}
