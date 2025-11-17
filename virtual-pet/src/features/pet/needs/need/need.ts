import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-need',
  imports: [],
  templateUrl: './need.html',
  styleUrl: './need.css',
})
export class Need implements OnInit{
  public needType = input<string>();
  ngOnInit(): void {
    console.log(this.needType());
  }
  

  

}
