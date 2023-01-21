import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlIconComponent } from '../icon/icon.component';

@Component({
  selector: 'mml-dialog',
  standalone: true,
  imports: [CommonModule, MmlIconComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class MmlDialogComponent implements OnInit, OnDestroy {

  @HostListener('click', ['$event'])
  getClick(ev: MouseEvent) {

    const clickedElement = ev.target as HTMLElement;

    if (clickedElement.localName == 'mml-dialog') this.emitSelectData(true);

    if (clickedElement.localName == 'mml-icon' && clickedElement.innerText == 'close') this.emitSelectData(true);

  }

  @Input()
  title?: string;

  @Output()
  dialogEvent = new EventEmitter<boolean>();
  emitSelectData(value: boolean) {

    this.dialogEvent.emit(value);

  }

  body!: HTMLBodyElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }
  
  ngOnInit(): void {

    this.body = this.elementRef.nativeElement.ownerDocument.body;

    this.hideScrollFromDialogBackground(this.body);

  }

  ngOnDestroy(): void {

    this.restoreScrollFromDialogBackground(this.body);

  }

  hideScrollFromDialogBackground(body: HTMLBodyElement) {

    this.renderer.setStyle(body, 'overflow', 'hidden');

  }

  restoreScrollFromDialogBackground(body: HTMLBodyElement) {

    this.renderer.setStyle(body, 'overflow', 'auto');

  }

}
