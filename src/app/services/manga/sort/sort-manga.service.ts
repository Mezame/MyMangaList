import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Manga } from '@models/manga';


type Order = 'asc' | 'des';

@Injectable({
  providedIn: 'root'
})
export class SortMangaService {

  constructor() { }

  sortMangaByTitle(order: Order, manga: Observable<Manga[]>): Observable<Manga[]> {

    let orderFn: (a: Manga, b: Manga) => number;

    if (order == 'asc') {

      orderFn = (a: Manga, b: Manga) => {

        return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1;

      }

    }

    if (order == 'des') {

      orderFn = (a: Manga, b: Manga) => {

        return a.title.toUpperCase() > b.title.toUpperCase() ? -1 : 1;

      }

    }

    return manga.pipe(
      map((m: Manga[]) => {

        return m.sort(orderFn);

      })
    );

  }

  sortMangaByUpdateDate(order: Order, manga: Observable<Manga[]>): Observable<Manga[]> {

    let orderFn: (a: Manga, b: Manga) => number;

    if (order == 'asc') {

      orderFn = (a: Manga, b: Manga) => {

        return Date.parse(b.updateDate) - Date.parse(a.updateDate);

      }

    }

    if (order == 'des') {

      orderFn = (a: Manga, b: Manga) => {

        return Date.parse(a.updateDate) - Date.parse(b.updateDate);

      }

    }

    return manga.pipe(
      map((m: Manga[]) => {

        return m.sort(orderFn);

      })
    );

  }

}
