import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandlerService } from '@services/manga/daves/error-handler/http-error-handler.service';
import { Manga } from '@models/manga';


export const apiUrl = '/api/v1/manga/';

@Injectable({
  providedIn: 'root'
})
export class ViewMangaService {

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {

    this.handleError = httpErrorHandler.createHandleError('ViewMangaService');

  }

  viewAllManga(): Observable<Manga[]> {

    return this.http.get<Manga[]>(apiUrl + 'mangas')
      .pipe(
        catchError(this.handleError<Manga[]>('viewAllManga', []))
      );

  }

  viewOneManga(id: number): Observable<Manga> {

    return this.http.get<Manga>(apiUrl + `manga/${id}`)
      .pipe(
        catchError(this.handleError<Manga>(`viewOneManga id=${id}`))
      );

  }

}
