import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '@services/manga/daves/error-handler/http-error-handler.service';
import { catchError, Observable, tap } from 'rxjs';
import { Manga } from '@models/manga';
import { AlertsService } from '@services/alert/alerts.service';
import { MangaForm } from '@pages/home/add-manga-dialog/add-manga-dialog.component';
import { apiUrl } from './view-manga.service';
import { Alert } from '@components/alert/alert';


export interface ServerResponse {
  newManga: Manga;
  resCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddMangaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private alertsService: AlertsService,
    httpErrorHandler: HttpErrorHandlerService) {

    this.handleError = httpErrorHandler.createHandleError('AddMangaService');

  }

  addOneManga(mangaForm: MangaForm): Observable<ServerResponse> {

    return this.http.post<ServerResponse>(apiUrl + 'manga', mangaForm, this.httpOptions)
      .pipe(
        tap((res: ServerResponse) => {

          this.setAlert(res.resCode);
          
          console.log(`added manga w/ id=${res.newManga.id}`);
        
        }),
        catchError(this.handleError<ServerResponse>('addOneManga'))
      );

  }

  setAlert(resCode: string) {

    let alert: Alert;

    if (resCode == 'ok') {

      alert = {
        type: 'success',
        message: `The manga was added successfuly.`
      }

    }

    if (resCode == 'invalidImage') {

      alert = {
        type: 'warning',
        message: `The manga was added, but image was missing.`
      }

    }

    if (resCode == 'unstoredImage') {

      alert = {
        type: 'warning',
        message: `The manga was added, but image could not be saved.`
      }

    }

    this.alertsService.showAlert(alert!);

  }

}
