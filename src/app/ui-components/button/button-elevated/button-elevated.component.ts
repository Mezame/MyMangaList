import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlIconComponent } from '../../icon/icon.component';

@Component({
  selector: '[mml-button-elevated]',
  standalone: true,
  imports: [CommonModule, MmlIconComponent],
  templateUrl: './button-elevated.component.html',
  styleUrls: ['./button-elevated.component.css']
})
export class MmlButtonElevatedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
