import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmlIconComponent } from '../icon/icon.component';

interface SelectMenuOptions {
  value: string;
  text: string;
}

@Component({
  selector: 'mml-select',
  standalone: true,
  imports: [CommonModule, MmlIconComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class MmlSelectComponent implements OnInit, AfterViewInit {

  @ViewChild('temporal', { read: ElementRef })
  projectedSelect!: ElementRef<HTMLDivElement>;

  @ViewChild('selectMenu', { read: ElementRef })
  selectMenu!: ElementRef<HTMLSelectElement>;

  @HostListener('document:click', ['$event'])
  getClick(ev: MouseEvent) {

    const clickedElement = ev.target as HTMLElement;

    this.hideSelectMenuOnUnfocus(clickedElement.parentElement!);

  }

  @Input()
  currentOption!: string | null;

  @Output()
  selectEvent = new EventEmitter<string>();
  emitSelectData(value: string) {

    this.selectEvent.emit(value);

  }

  isSelectMenuOpen = false;

  iconName!: 'arrow_drop_down' | 'arrow_drop_up';

  selectId!: string;

  selectMenuSize!: number;

  selectButtonText!: string;

  selectMenuOptions: SelectMenuOptions[] = [];

  isSelectButtonFocused = false;

  currentOptionSelected!: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.iconName = 'arrow_drop_down';

    this.selectMenuSize = this.elementRef.nativeElement.firstChild.children.length;

    if (this.elementRef.nativeElement.id !== '') {

      this.selectId = this.elementRef.nativeElement.id;

      this.renderer.removeAttribute(this.elementRef.nativeElement, 'id');

    }

    this.getSelectMenuOptions();

    if (this.currentOption) {

      this.selectMenuOptions.forEach(option => {

        if (option.value == this.currentOption) this.selectButtonText = option.text;

        if (option.value == this.currentOption) this.currentOptionSelected = option.value;

      });

    }
    else {

      if (this.selectMenuOptions[0] !== undefined) {

        this.selectButtonText = this.selectMenuOptions[0].text;

        this.currentOptionSelected = this.selectMenuOptions[0].value;

      }

    }

  }

  ngAfterViewInit(): void {

    this.renderer.removeChild(this.elementRef.nativeElement, this.projectedSelect.nativeElement);

    if (this.selectId) {

      this.renderer.setProperty(this.selectMenu.nativeElement, 'id', this.selectId);

      this.renderer.setAttribute(this.selectMenu.nativeElement, 'aria-label', this.selectId);

    }

    if (this.currentOption) {

      Array.prototype.forEach.call(this.selectMenu.nativeElement, option => {

        if (option.value == this.currentOption) this.renderer.addClass(option, 'option-checked');

      });

    }
    else {

      if (this.selectMenu.nativeElement[0] !== undefined) {

        this.renderer.addClass(this.selectMenu.nativeElement[0], 'option-checked');

      }

    }

  }

  showSelectMenu() {

    if (this.isSelectMenuOpen == false) {

      this.isSelectMenuOpen = true;

      this.iconName = 'arrow_drop_up';
    }
    else {

      this.hideSelectMenu();
    }
  }

  hideSelectMenu() {

    this.isSelectMenuOpen = false;

    this.iconName = 'arrow_drop_down';
  }

  updateSelect(selectMenu: HTMLSelectElement) {

    try {

      const index = selectMenu.selectedIndex;

      const selectedOptionsText = selectMenu.selectedOptions[0].text;

      let selectMenuClone: any = selectMenu;

      let options: HTMLOptionsCollection = selectMenu.options;

      this.emitSelectDataOnChange(selectMenu.value);

      this.currentOptionSelected = selectMenu.value;

      this.selectButtonText = selectedOptionsText;

      Array.prototype.forEach.call(options, option => {

        this.renderer.removeClass(option, 'option-checked');

      });

      this.renderer.addClass(selectMenu[index], 'option-checked');

      selectMenuClone[index].selected = false;

      selectMenu = selectMenuClone;

    } catch (error) { }

  }

  getSelectMenuOptions() {

    const selectOptions: HTMLOptionsCollection = this.elementRef.nativeElement.firstChild.children;

    Array.prototype.forEach.call(selectOptions, values => {

      this.selectMenuOptions.push({ value: values.value, text: values.text });

    });

  }

  setCurrentOption(currentOption: string) {

    const selectMenuClone: any = this.selectMenu.nativeElement;

    this.currentOption = currentOption;

    this.currentOptionSelected = currentOption;

    this.selectMenu.nativeElement.value = currentOption;

    const index = this.selectMenu.nativeElement.selectedIndex;

    selectMenuClone[index].selected = false;

    /* https://www.w3docs.com/snippets/javascript/how-to-convert-string-to-title-case-with-javascript.html */
    this.selectButtonText = currentOption.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');

    Array.prototype.forEach.call(this.selectMenu.nativeElement, option => {

      this.renderer.removeClass(option, 'option-checked');

    });

    Array.prototype.forEach.call(this.selectMenu.nativeElement, option => {

      if (option.value == currentOption) this.renderer.addClass(option, 'option-checked');

    });

  }

  hideSelectMenuOnUnfocus(clickedElement: HTMLElement) {

    const selectButton: HTMLButtonElement = this.elementRef.nativeElement.children[0];

    const isSelectCliked = clickedElement !== this.elementRef.nativeElement && clickedElement !== selectButton;

    if (isSelectCliked && this.isSelectMenuOpen == true) {

      this.hideSelectMenu();

    }

  }

  emitSelectDataOnChange(updatedValue: string) {

    if (updatedValue !== this.currentOptionSelected) {

      this.emitSelectData(updatedValue);

    };

  }

}
