import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlIconComponent } from '../icon/icon.component';
import { Icon } from '../icon/icon';

@Component({
  selector: 'mml-icon-button',
  standalone: true,
  imports: [CommonModule, MmlIconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class MmlIconButtonComponent implements OnInit {

  @Input()
  look?: 'standard' | 'tonal';

  @Input()
  icon!: Icon['iconName'];

  @HostBinding('class.standard') get standard() { return this.isStandard; }

  @HostBinding('class.tonal') get tonal() { return this.isTonal; }

  isStandard = false;

  isTonal = false;

  constructor() { }

  ngOnInit(): void {
    
    this.isStandard = this.look == 'standard' || this.look == undefined;

    this.isTonal = this.look == 'tonal';
  }

}
