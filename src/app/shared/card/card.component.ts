import { Component, Input, OnInit } from '@angular/core';
import { Vino } from 'src/app/pages/vinos/vino.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() vino!: Vino;

  constructor() { }

  ngOnInit(): void {
  }

}
