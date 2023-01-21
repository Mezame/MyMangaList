import { Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MmlCardComponent } from '@components/card/card.component';
import { Manga } from '@models/manga';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'mml-manga-card-list',
  templateUrl: './manga-card-list.component.html',
  styleUrls: ['./manga-card-list.component.css']
})
export class MangaCardListComponent implements OnInit {

  @Input()
  manga$!: Observable<Manga[]>;

  @Output()
  openEditMangaDialogEvent = new EventEmitter<number>();
  emitOpenEditMangaDialog(mangaId: number) {
    this.openEditMangaDialogEvent.emit(mangaId);
  }

  @Output()
  addMangaChapterEvent = new EventEmitter<any>();
  emitAddMangaChapter(mangaId: number, mangaChapter: number) {
    const value = {
      mangaId,
      mangaChapter
    }
    this.addMangaChapterEvent.emit(value);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setStackedCardsColumns();
  }

  windowInnerWidth!: number;

  stackedCardsArray!: number[];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

    this.setStackedCardsColumns();

  }

  setStackedCardsColumns() {

    this.windowInnerWidth = window.innerWidth;

    if (this.windowInnerWidth <= 1088) {

      this.stackedCardsArray = Array.from({ length: 3 }, (_, i) => i + 1);

    } else {

      this.stackedCardsArray = Array.from({ length: 4 }, (_, i) => i + 1);

    }

  }

  mangaFilteredByStackedCard(stack: number, stackCount: number): Observable<Manga[]> {

    if (this.manga$ !== undefined) {

      return this.manga$.pipe(
        map((m: Manga[]) => {

          return m.filter((_m, index: number) => {

            if (index == stack - 1) {

              stack += stackCount;
              return true;
            }
            else { return false; }

          });

        })
      );

    } else {

      return of<Manga[]>([]);

    }

  }

  showMangaOptionsButtons(e: MouseEvent) {

    const mangaCard: any = e.target as unknown as MmlCardComponent;

    let mangaOptionsButtons: HTMLDivElement = mangaCard.children[0].children[1] ?? mangaCard.children[0].children[0];

    let mangaAddChapterButton: HTMLDivElement = mangaCard.children[2].children[2];

    this.renderer.removeClass(mangaOptionsButtons, 'hide');

    this.renderer.removeClass(mangaAddChapterButton, 'hide');

  }

  hideMangaOptionsButtons(e: MouseEvent) {

    const mangaCard: any = e.target as unknown as MmlCardComponent;

    let mangaOptionsButtons: HTMLDivElement = mangaCard.children[0].children[1] ?? mangaCard.children[0].children[0];

    let mangaAddChapterButton: HTMLDivElement = mangaCard.children[2].children[2];

    this.renderer.addClass(mangaOptionsButtons, 'hide');

    this.renderer.addClass(mangaAddChapterButton, 'hide');

  }

  goToMangaSite(mangaSite: string) {

    window.open(mangaSite, '_blank');

  }

}
