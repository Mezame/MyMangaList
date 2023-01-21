import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[mml-text-area]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class MmlTextAreaComponent implements OnInit {

  @Input()
  isError = false;

  @HostBinding('class.error') get error() { return this.isError; }

  constructor() { }

  ngOnInit(): void {
  }

}
