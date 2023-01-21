import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AddMangaService, ServerResponse } from './add-manga.service';
import { mangaMock } from '@mocks/manga';
import { MangaForm } from '@pages/home/add-manga-dialog/add-manga-dialog.component';
import { Manga, Status } from '@models/manga';
import { apiUrl } from './view-manga.service';
import { HttpResponse } from '@angular/common/http';

describe('AddMangaService', () => {
  let addMangaService: AddMangaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddMangaService]
    });
    addMangaService = TestBed.inject(AddMangaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(addMangaService).toBeTruthy();
  });

  describe('#addOneManga', () => {
    let newManga: Manga;
    let mangaForm: MangaForm;
    let serverResponse: ServerResponse;

    beforeEach(() => {
      mangaForm = {
        mangaTitle: 'Reincarnation no Kaben',
        mangaStatus: 'reading',
        mangaChapter: '61',
        mangaSite: undefined,
        mangaCoverImageAsDataURL: undefined
      };
    });

    it('should add a manga and return it', () => {
      
      newManga = {
        id: mangaMock.length + 1,
        imageUrl: undefined,
        title: mangaForm.mangaTitle,
        status: mangaForm.mangaStatus as Status,
        chapter: parseInt(mangaForm.mangaChapter),
        updateDate: new Date(Date.now()).toLocaleString(),
        mangaSite: undefined,
        url: 'reincarnation-no-kaben'
      }

      serverResponse = {
        newManga,
        resCode: 'ok'
      };

      addMangaService.addOneManga(mangaForm).subscribe({
        next: res =>expect(res.newManga)
        .withContext('should return the manga')
        .toEqual(newManga),
        error: e => fail
      });

      const req = httpTestingController.expectOne(apiUrl + 'manga');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mangaForm);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: serverResponse });
      req.event(expectedResponse);

    });

    it('should return 403 error', () => {

      addMangaService.addOneManga(mangaForm).subscribe({
        next: res => expect(res).not.toContain(newManga),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + 'manga');

      req.flush({}, { status: 403, statusText: 'Forbiden' });
    });

  });

});
