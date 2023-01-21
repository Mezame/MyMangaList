import { Injectable } from '@angular/core';
import { Manga } from '@models/manga';
import { BehaviorSubject } from 'rxjs';
import { ViewMangaService } from '../daves/view-manga.service';

@Injectable({
  providedIn: 'root'
})
export class MangaStoreService {

  private manga$: BehaviorSubject<Manga[]> = new BehaviorSubject<Manga[]>([]);

  constructor(private viewMangaService: ViewMangaService) {

    this.viewMangaService.viewAllManga().subscribe(m => {

      this.manga$.next(m);

    });

  }

  viewAllManga(): BehaviorSubject<Manga[]> {

    return this.manga$;

  }

  renewViewAllManga(manga: Manga, id = 0) {

    if(id == 0) {

      this.manga$.subscribe(m => {

        m.push(manga);
  
      });

    } else {

      this.manga$.subscribe(m => {

        const mangaIndex = m.findIndex(m => m.id == id);

        m.splice(mangaIndex, 1);
  
      });

    }

  }

  renewOneManga(id: number, manga: Manga) {

    this.manga$.subscribe(m => {

      const mangaIndex = m.findIndex(m => m.id == id);

      m.splice(mangaIndex, 1, manga);

    });

  }

}
