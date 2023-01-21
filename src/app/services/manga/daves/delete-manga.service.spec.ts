import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mangaMock } from '@mocks/manga';
import { Manga } from '@models/manga';

import { DeleteMangaService } from './delete-manga.service';
import { apiUrl } from './view-manga.service';

describe('DeleteMangaService', () => {
  let deleteMangaService: DeleteMangaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteMangaService]
    });
    deleteMangaService = TestBed.inject(DeleteMangaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(deleteMangaService).toBeTruthy();
  });

  describe('#deleteOneManga', () => {
    let deletedManga: Manga;
    let mangaId: number;

    beforeEach(() => {
      deletedManga = mangaMock[3];
      mangaId = deletedManga.id;
    });

    it('should delete manga and return it', () => {

      deleteMangaService.deleteOneManga(mangaId).subscribe({
        next: manga => expect(manga)
          .withContext('should return the manga')
          .toEqual(deletedManga),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: deletedManga });
      req.event(expectedResponse);
    });

    it('should return 403 error', () => {

      deleteMangaService.deleteOneManga(mangaId).subscribe({
        next: manga => expect(manga).not.toContain(manga),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);

      req.flush({}, { status: 404, statusText: 'Forbiden' });
    });

  });

});
