import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '@components/alert/alert';
import { Manga } from '@models/manga';
import { MangaForm } from '@pages/home/add-manga-dialog/add-manga-dialog.component';
import { AlertsService } from '@services/alert/alerts.service';
import { HandleError, HttpErrorHandlerService } from '@services/manga/daves/error-handler/http-error-handler.service';
import { catchError, Observable, tap } from 'rxjs';
import { apiUrl } from './view-manga.service';


export interface ServerResponse {
  editedManga: Manga;
  resCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditMangaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient,
    private alertsService: AlertsService,
    httpErrorHandler: HttpErrorHandlerService) {

    this.handleError = httpErrorHandler.createHandleError('EditMangaService');

  }

  editOneManga(id: number, mangaForm: Partial<MangaForm>): Observable<ServerResponse> {

    const data = { id, mangaForm };

    return this.http.put(apiUrl + `manga/${id}`, data, this.httpOptions)
      .pipe(
        tap((res: any) => {

          this.setAlert(res.resCode);

          console.log(`edited manga w/ id=${res.editedManga.id}`);

        }),
        catchError(this.handleError<ServerResponse>('editOneManga'))
      );

  }

  editChapterFromOneManga(id: number, chapter: string): Observable<Manga> {

    const data = { id, chapter };

    return this.http.patch<Manga>(apiUrl + `mangaChapter/${id}`, data, this.httpOptions)
      .pipe(
        tap((patchedManga) => {

          console.log(`edited chapter from manga w/ id=${patchedManga.id}`);

        }),
        catchError(this.handleError<Manga>('editChapterFromOneManga'))
      );

  }

  setAlert(resCode: string) {

    let alert!: Alert;

    if (resCode == 'ok') {

      alert = {
        type: 'success',
        message: `The manga was edited successfuly.`
      }

    }

    if (resCode == 'invalidImage') {

      alert = {
        type: 'warning',
        message: `The manga was edited but image.`
      }

    }

    if (resCode == 'unstoredImage') {

      alert = {
        type: 'warning',
        message: `The manga was edited but image.`
      }

    }

    this.alertsService.showAlert(alert);

  }

}
