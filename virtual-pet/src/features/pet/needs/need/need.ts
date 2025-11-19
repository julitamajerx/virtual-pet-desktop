import { Component, computed, inject, input, OnInit } from '@angular/core';
import { PetService } from '../../../../services/pet-service';

@Component({
  selector: 'app-need',
  imports: [],
  templateUrl: './need.html',
  styleUrl: './need.css',
})
export class Need implements OnInit {
  public needType = input<string>();
  protected needSymbol: string = 'x';
  ngOnInit(): void {
    const value = this.needType();
    this.needSymbol = value!.charAt(0).toUpperCase();
  }

  private needsService = inject(PetService);

  currentNeedLevel = computed(() => {
    const needSignal = this.needsService.getNeedLevel(this.needType()!);
    return needSignal ? needSignal() : 0;
  });
}
