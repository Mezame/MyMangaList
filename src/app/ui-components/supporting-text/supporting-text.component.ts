import { Component, HostBinding, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportingText } from './supporting-text';

@Component({
  selector: 'mml-supporting-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporting-text.component.html',
  styleUrls: ['./supporting-text.component.css'],
  host: { 'class': 'body-small' }
})
export class MmlSupportingTextComponent implements OnInit {

  @Input()
  text!: SupportingText['text'];

  @Input()
  type!: SupportingText['type'];

  @Input()
  isError = false;

  @HostBinding('class.error') get error() { return this.isError; }

  constructor() { }

  ngOnInit(): void {

    

  }

}
