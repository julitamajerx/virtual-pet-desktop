import { Component, computed, inject, input, OnInit } from '@angular/core';
import { PetService } from '../../../../services/pet-service';

@Component({
  selector: 'app-need',
  imports: [],
  templateUrl: './need.html',
  styleUrl: './need.css',
})
export class Need {
  public needType = input<string>();

  private needsService = inject(PetService);

  currentNeedLevel = computed(() => {
    const needSignal = this.needsService.getNeedLevel(this.needType()!);

    return needSignal ? needSignal() : 0;
  });
}
