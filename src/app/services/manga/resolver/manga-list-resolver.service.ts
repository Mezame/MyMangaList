import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { Manga } from '@models/manga';
import { FilterMangaService } from '../filter/filter-manga.service';
import { MangaStoreService } from '../store/manga-store.service';
import { TabList } from '@pages/home/home.page';


@Injectable({
  providedIn: 'root'
})
export class MangaListResolverService implements Resolve<Manga[]> {

  manga$!: Observable<Manga[]>;

  tabList: TabList[] = ['reading', 'completed', 'planning', 'paused', 'all'];

  constructor(
    private mangaStoreService: MangaStoreService,
    private filterMangaService: FilterMangaService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Manga[]> | Observable<never> {

    const mangaByStatus = route.paramMap.get('mangaByStatus')!;

    if (this.tabList.includes(mangaByStatus as TabList)) {

      if (mangaByStatus !== 'all') {

        this.manga$ = this.filterMangaService.filterMangaByStatus(mangaByStatus as Manga['status'],
          this.mangaStoreService.viewAllManga()
        );

      } else {

        this.manga$ = this.mangaStoreService.viewAllManga();

      }

      return this.manga$;

    } else {

      this.router.navigate(['page-not-found']);

      return EMPTY;
      
    }

  }

}
