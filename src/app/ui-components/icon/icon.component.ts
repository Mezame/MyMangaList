import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mml-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  host: {'class': 'material-symbols-rounded'}
})
export class MmlIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
