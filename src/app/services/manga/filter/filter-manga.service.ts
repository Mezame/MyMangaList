import { Injectable } from '@angular/core';
import { Manga } from '@models/manga';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterMangaService {

  constructor() { }

  filterMangaByStatus(status: Manga['status'], manga: Observable<Manga[]>): Observable<Manga[]> {

    return manga.pipe(
      map((m: Manga[]) => {

        return m.filter( (m: Manga) => {

          return m.status == status ? true : false;

        });

      })
    );

  }

}
