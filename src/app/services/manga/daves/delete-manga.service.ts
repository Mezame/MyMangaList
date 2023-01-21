import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '@components/alert/alert';
import { Manga } from '@models/manga';
import { AlertsService } from '@services/alert/alerts.service';
import { HandleError, HttpErrorHandlerService } from '@services/manga/daves/error-handler/http-error-handler.service';
import { catchError, Observable, tap } from 'rxjs';
import { apiUrl } from './view-manga.service';


@Injectable({
  providedIn: 'root'
})
export class DeleteMangaService {

  private handleError: HandleError;

  constructor(private http: HttpClient,
    private alertsService: AlertsService,
    httpErrorHandler: HttpErrorHandlerService) {

    this.handleError = httpErrorHandler.createHandleError('DeleteMangaService');

  }

  deleteOneManga(id: number): Observable<Manga> {

    return this.http.delete<Manga>(apiUrl + `manga/${id}`)
      .pipe(
        tap( (deletedManga: Manga) => {

          const alert: Alert = {
            type: 'success',
            message: `The manga was deleted successfuly.`
          }
        
          this.alertsService.showAlert(alert);

          console.log(`deleted manga w/ id=${deletedManga.id}`);

        }),
        catchError(this.handleError<Manga>('deleteOneManga'))
      );

  }

}
