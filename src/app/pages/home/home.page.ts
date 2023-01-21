import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { last, Observable, of, tap, throwError } from 'rxjs';

import { Manga } from '@models/manga';
import { SortMangaService } from '@services/manga/sort/sort-manga.service';
import { FilterMangaService } from '@services/manga/filter/filter-manga.service';
import { MmlSelectComponent } from '@components/select/select.component';
import { MangaCardListComponent } from './manga-card-list/manga-card-list.component';
import { MangaStoreService } from '@services/manga/store/manga-store.service';
import { AddMangaService } from '@services/manga/daves/add-manga.service';
import { AddMangaDialogComponent, MangaForm } from './add-manga-dialog/add-manga-dialog.component';
import { EditMangaDialogComponent } from './edit-manga-dialog/edit-manga-dialog.component';
import { EditMangaService } from '@services/manga/daves/edit-manga.service';
import { DeleteMangaService } from '@services/manga/daves/delete-manga.service';
import { AuthService } from '@services/auth/auth.service';


export type TabList = 'reading' | 'completed' | 'planning' | 'paused' | 'all';

@Component({
  selector: 'mml-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('tabList', { read: ElementRef })
  tabList!: ElementRef<HTMLDivElement>;

  @ViewChild('mangaList', { read: MangaCardListComponent })
  mangaList!: MangaCardListComponent;

  @ViewChild('sortMangaSelect', { read: MmlSelectComponent })
  sortMangaSelect!: MmlSelectComponent;

  @ViewChild('addMangaDialog', { read: AddMangaDialogComponent })
  addMangaDialog!: AddMangaDialogComponent;

  @ViewChild('editMangaDialog', { read: EditMangaDialogComponent })
  editMangaDialog!: EditMangaDialogComponent;

  manga$!: Observable<Manga[]>;

  mangaCount!: number;

  mangaStatusAvaliable: string[] = [];

  showNoManga = false;

  tabListArray: TabList[] = ['reading', 'completed', 'planning', 'paused', 'all'];

  currentTabItem!: TabList;

  showTabList = true;

  currentSegmentButton!: 'asc' | 'des';

  constructor(
    private mangaStoreService: MangaStoreService,
    private filterMangaService: FilterMangaService,
    private sortMangaService: SortMangaService,
    private addMangaService: AddMangaService,
    private editMangaService: EditMangaService,
    private deleteMangaService: DeleteMangaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.manga$ = this.mangaStoreService.viewAllManga();

    this.manga$.pipe(
      tap(m => {

        m.forEach(m => {

          if (!this.mangaStatusAvaliable.includes(m.status)) {

            this.mangaStatusAvaliable.push(m.status);

          }

        });

        if (this.mangaStatusAvaliable.length > 1) { this.mangaStatusAvaliable.push('all'); };

      }),
      last(),
      tap(m => {

        this.mangaCount = m.length;

        if (this.mangaCount < 1) {

          this.showNoManga = true;

        }

      })
    ).subscribe();

    this.currentSegmentButton = 'asc';

    if (!!this.route.snapshot.data['manga']) {

      const mangaByStatus = this.route.snapshot.paramMap.get('mangaByStatus')!;

      if (mangaByStatus !== 'all') {

        this.manga$ = this.filterMangaService.filterMangaByStatus(mangaByStatus as Manga['status'],
          this.mangaStoreService.viewAllManga()
        );

      } else {

        this.manga$ = this.mangaStoreService.viewAllManga();

      }

    } else { this.manga$ = of(this.route.snapshot.data['manga']); }

  }

  ngAfterViewInit(): void {

    if (this.sortMangaSelect) {

      this.manga$ = this.sortMangaBy((this.sortMangaSelect.currentOptionSelected! as 'lastUpdate' | 'title') ?? 'lastUpdate', this.manga$);

    }

    if (this.mangaList) { this.mangaList.manga$ = this.manga$ };

  }

  updateMangaFilterByStatus(mangaByStatus: string) {

    if (mangaByStatus !== 'all') {

      this.manga$ = this.sortMangaBy((this.sortMangaSelect.currentOptionSelected! as 'lastUpdate' | 'title') ?? 'lastUpdate',
        this.filterMangaService.filterMangaByStatus(mangaByStatus as Manga['status'],
          this.mangaStoreService.viewAllManga()
        )
      );

    } else {

      this.manga$ = this.sortMangaBy((this.sortMangaSelect.currentOptionSelected! as 'lastUpdate' | 'title') ?? 'lastUpdate',
        this.mangaStoreService.viewAllManga()
      );

    }

    if (this.mangaList) { this.mangaList.manga$ = this.manga$ };

  }

  activateSegmentedButton(segBut: 'asc' | 'des') {

    if (segBut !== this.currentSegmentButton) {

      this.currentSegmentButton = segBut;

      this.manga$ = this.sortMangaBy((this.sortMangaSelect.currentOptionSelected! as 'lastUpdate' | 'title') ?? 'lastUpdate', this.manga$);

      if (this.mangaList) { this.mangaList.manga$ = this.manga$ };

    }

  }

  getSortMangaFromSelect(sort: string) {

    this.manga$ = this.sortMangaBy((sort as 'lastUpdate' | 'title'), this.manga$);

    if (this.mangaList) { this.mangaList.manga$ = this.manga$ };

  }

  sortMangaBy(sort = 'lastUpdate',
    manga: Observable<Manga[]> = this.manga$): Observable<Manga[]> {

    if (sort == 'lastUpdate') {

      manga = this.sortMangaService.sortMangaByUpdateDate(this.currentSegmentButton, manga);

    }

    if (sort == 'title') {

      manga = this.sortMangaService.sortMangaByTitle(this.currentSegmentButton, manga);

    }

    return manga;

  }

  addManga(mangaForm: MangaForm) {

    const status = mangaForm.mangaStatus;

    this.addMangaService.addOneManga(mangaForm).subscribe(res => {

      if (res.newManga) {

        this.mangaStoreService.renewViewAllManga(res.newManga);

        this.setMangaStatusAvaliable();

        this.router.navigate(['manga/' + status]);

        this.updateMangaFilterByStatus(status);

        this.showTabList = false;

        this.showTabList = true;

        this.showNoManga = false;

      }

    });

    const isSubmit = true;

    this.addMangaDialog.closeDialog(isSubmit);

  }

  editManga(value: any) {

    this.editMangaService.editOneManga(value.mangaId, value.mangaForm).subscribe(res => {

      if (res.editedManga) {

        this.mangaStoreService.renewOneManga(res.editedManga.id, res.editedManga);

        this.setMangaStatusAvaliable();

        this.router.navigate(['manga/' + res.editedManga.status]);

        this.updateMangaFilterByStatus(res.editedManga.status);

        this.showTabList = false;

        this.showTabList = true;

        this.showNoManga = false;

      }

    });

    const isSubmit = true;

    this.editMangaDialog.closeDialog(isSubmit);

  }

  addMangaChapter(value: any) {

    this.editMangaService.editChapterFromOneManga(value.mangaId, value.mangaChapter).subscribe(m => {

      if (m) {

        this.mangaStoreService.renewOneManga(m.id, m);

      }

    });

  }

  deleteOneManga(id: number) {

    if (confirm('The manga will be deleted permanently. Are you sure?') == true) {

      this.deleteMangaService.deleteOneManga(id).subscribe(m => {

        if (m) {

          this.mangaStoreService.renewViewAllManga(m, m.id);

          this.setMangaStatusAvaliable();

          this.router.navigate(['manga/' + 'all']);

          this.updateMangaFilterByStatus('all');

          this.showTabList = false;

          this.showTabList = true;

          this.showNoManga = false;

        }

      });

      const isSubmit = true;

      this.editMangaDialog.closeDialog(isSubmit);

    }

  }

  setMangaStatusAvaliable() {

    this.mangaStatusAvaliable = [];

    this.mangaStoreService.viewAllManga().subscribe(m => {

      m.forEach(m => {

        if (!this.mangaStatusAvaliable.includes(m.status)) {

          this.mangaStatusAvaliable.push(m.status);

        }

      });

      if (this.mangaStatusAvaliable.length > 1 && !this.mangaStatusAvaliable.includes('all')) { this.mangaStatusAvaliable.push('all'); };

    });

  }

  logout() {

    this.authService.logout().subscribe({
      next: res => {
        if (res.message) {
          this.router.navigate(['login']);
        }
      },
      error: error => {
        if (error) {

          setTimeout(() => {

            location.reload();
            
          }, 5500);

        }
      }
    });

  }

}
