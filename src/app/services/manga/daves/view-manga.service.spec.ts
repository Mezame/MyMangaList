import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { apiUrl, ViewMangaService } from './view-manga.service';
import { mangaMock } from '@mocks/manga';
import { Manga } from '@models/manga';

describe('ViewMangaService', () => {
  let viewMangaService: ViewMangaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewMangaService]
    });
    viewMangaService = TestBed.inject(ViewMangaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(viewMangaService).toBeTruthy();
  });

  describe('#viewAllManga', () => {
    let expectedMangas: Manga[];

    beforeEach(() => {
      expectedMangas = mangaMock as Manga[];
    });

    it('should return expected mangas (called once)', () => {

      viewMangaService.viewAllManga().subscribe({
        next: mangas => expect(mangas)
          .withContext('should return expected mangas')
          .toEqual(expectedMangas),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + 'mangas');

      expect(req.request.method).toEqual('GET');

      req.flush(expectedMangas);

    });

    it('should be OK returning no mangas', () => {

      viewMangaService.viewAllManga().subscribe({
        next: mangas => expect(mangas.length)
          .withContext('should have empty mangas array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + 'mangas');

      req.flush([]);

    });

    it('should return 403 error', () => {

      viewMangaService.viewAllManga().subscribe({
        next: mangas => expect(mangas.length)
          .withContext('should have empty mangas array')
          .toEqual(0),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + 'mangas');

      req.flush({}, { status: 403, statusText: 'Forbiden' });
    });

    it('should return expected mangas (called multiple times)', () => {

      viewMangaService.viewAllManga().subscribe();
      viewMangaService.viewAllManga().subscribe();
      viewMangaService.viewAllManga().subscribe({
        next: mangas => expect(mangas)
          .withContext('should return expected mangas')
          .toEqual(expectedMangas),
        error: fail
      });

      const requests = httpTestingController.match(apiUrl + 'mangas');
      expect(requests.length)
        .withContext('calls to viewAllManga()')
        .toEqual(3);

      // Respond to each request with different mock manga results
      requests[0].flush([]);
      requests[1].flush([mangaMock[0], mangaMock[1]]);
      requests[2].flush(expectedMangas);
    });

  });

  describe('#viewOneManga', () => {
    let expectedManga: Manga;
    let mangaId: number;

    beforeEach(() => {
      expectedManga = mangaMock[0] as Manga;
      mangaId = expectedManga.id;
    });

    it('should return expected manga', () => {

      viewMangaService.viewOneManga(mangaId).subscribe({
        next: manga => expect(manga)
          .withContext('should return expected manga')
          .toEqual(expectedManga),
        error: fail
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);

      expect(req.request.method).toEqual('GET');

      req.flush(expectedManga);

    });

    it('should return 403 error', () => {

      viewMangaService.viewOneManga(mangaId).subscribe({
        next: manga => expect(manga).not.toContain(manga),
        error: error => expect(error.status).toBe(403)
      });

      const req = httpTestingController.expectOne(apiUrl + `manga/${mangaId}`);

      req.flush({}, { status: 403, statusText: 'Forbiden' });
    });

  });

});
