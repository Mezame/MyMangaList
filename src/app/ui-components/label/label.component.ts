import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mml-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class MmlLabelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
