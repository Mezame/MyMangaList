import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '@components/alert/alert';
import { AlertsService } from '@services/alert/alerts.service';
import { Observable, of } from 'rxjs';


/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private alertsService: AlertsService) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      this.handleError(serviceName, operation, result);

  /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     *
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {

      let alert: Alert = {
        type: 'error',
        message: 'Something is wrong with the app.'
      }
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      if (error.error instanceof Event) {
        throw error.error;
      }

      /*const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;*/

      // TODO: better job of transforming error for user consumption
      //this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);

      if (error.status == 403 && error.statusText == 'Bad Request') {

        alert = {
          type: 'error',
          message: 'Something is wrong with your request.'
        }

      };

      this.alertsService.showAlert(alert);

      //throw new Error(`${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of(result);
    };

  }

}
