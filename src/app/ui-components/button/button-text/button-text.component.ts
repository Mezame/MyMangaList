import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[mml-button-text]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.css']
})
export class MmlButtonTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
