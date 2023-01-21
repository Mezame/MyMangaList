import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlIconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'mml-top-app-bar',
  standalone: true,
  imports: [CommonModule, MmlIconButtonComponent],
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.css']
})
export class MmlTopAppBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
