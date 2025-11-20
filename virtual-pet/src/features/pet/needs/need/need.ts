import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { PetService } from '../../../../services/pet-service';
import { LoggerService } from '../../../../services/logger-service';

@Component({
  selector: 'app-need',
  imports: [],
  templateUrl: './need.html',
  styleUrl: './need.css',
})
export class Need implements OnInit {
  public needType = input<string>();
  protected needSymbol: string = 'x';

  private needsService = inject(PetService);
  private loggerService = inject(LoggerService);

  ngOnInit(): void {
    const value = this.needType();
    this.needSymbol = value!.charAt(0).toUpperCase();
  }

  constructor() {
    effect(() => {
      const level = this.needsService.getNeedLevel(this.needType()!)();

      if (level === 0) {
        this.loggerService.log(`${this.needType()} got to 0 at ${new Date().toLocaleTimeString()}`);
      }
    });
  }

  currentNeedLevel = computed(() => {
    const needSignal = this.needsService.getNeedLevel(this.needType()!);
    return needSignal ? needSignal() : 0;
  });
}
