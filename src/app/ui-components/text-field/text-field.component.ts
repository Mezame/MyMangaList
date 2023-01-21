import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlLabelComponent } from '../label/label.component';
import { MmlSupportingTextComponent } from '../supporting-text/supporting-text.component';
import { SupportingText } from '../supporting-text/supporting-text';

@Component({
  selector: '[mml-text-field]',
  standalone: true,
  imports: [CommonModule, MmlLabelComponent, MmlSupportingTextComponent],
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class MmlTextFieldComponent implements OnInit {

  @Input()
  isError = false;

  @HostBinding('class.error') get error() { return this.isError; }

  constructor() {
    
  }

  ngOnInit(): void {

    
  }

}
