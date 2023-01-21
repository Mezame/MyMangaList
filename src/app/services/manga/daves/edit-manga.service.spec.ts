import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mangaMock } from '@mocks/manga';
import { Manga, Status } from '@models/manga';
import { MangaForm } from '@pages/home/add-manga-dialog/add-manga-dialog.component';

import { EditMangaService, ServerResponse } from './edit-manga.service';
import { apiUrl } from './view-manga.service';

describe('EditMangaService', () => {
  let editMangaService: EditMangaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditMangaService]
    });
    editMangaService = TestBed.inject(EditMangaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(editMangaService).toBeTruthy();
  });

  describe('#editOneManga', () => {
    let editedManga: Manga;
    let mangaId: number;
    let mangaForm: Partial<MangaForm>;
    let serverResponse: ServerResponse;

    beforeEach(() => {
      mangaForm = {
        mangaStatus: 'reading'
      };
      editedManga = mangaMock[8];
      editedManga.status = mangaForm.mangaStatus as Status;
      mangaId = editedManga.id;
    });

    it('should edit a manga and return it', () => {

      serverResponse = {
        editedManga,
        resCode: 'ok'
      };

      editMangaService.editOneManga(mangaId, mangaForm).subscribe({
        next: res => expect(res.editedManga)
          .withContext('should return the manga')
          .toEqual(editedManga),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({ id: mangaId, mangaForm });

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: serverResponse });
      req.event(expectedResponse);
    });

    it('should return 403 error', () => {

      editMangaService.editOneManga(mangaId, mangaForm).subscribe({
        next: res => expect(res).not.toContain(res),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);

      req.flush({}, { status: 404, statusText: 'Forbiden' });
    });

  });

  describe('#editChapterFromOneManga', () => {
    let editedManga: Manga;
    let mangaId: number;
    let mangaChapter: string;

    beforeEach(() => {
      editedManga = mangaMock[8] as Manga;
      mangaId = editedManga.id;
      mangaChapter = '88';
      editedManga.chapter = parseInt(mangaChapter);
    });

    it('should edit a manga and return it', () => {

      editMangaService.editChapterFromOneManga(mangaId, mangaChapter).subscribe({
        next: manga => expect(manga)
          .withContext('should return the manga')
          .toEqual(editedManga),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + `mangaChapter/${mangaId}`);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual({ id: mangaId, chapter: mangaChapter });

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: editedManga });
      req.event(expectedResponse);
    });

    it('should return 403 error', () => {

      editMangaService.editChapterFromOneManga(mangaId, mangaChapter).subscribe({
        next: manga => expect(manga).not.toContain(manga),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + `mangaChapter/${mangaId}`);

      req.flush({}, { status: 404, statusText: 'Forbiden' });
    });

  });

});
