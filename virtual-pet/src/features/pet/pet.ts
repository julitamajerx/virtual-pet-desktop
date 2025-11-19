import { Component, inject } from '@angular/core';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-pet',
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
})
export class Pet {
  private petService = inject(PetService);

  pet() {
    this.petService.satisfyNeed('fun', 5);
  }
}
