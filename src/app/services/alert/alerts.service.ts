import { Injectable } from '@angular/core';
import { Alert } from '@components/alert/alert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alert$: BehaviorSubject<Alert> = new BehaviorSubject<Alert>({});

  showAlert(alert: Alert) {

    this.alert$.next(alert);

  }

  getAlert(): BehaviorSubject<Alert> {

    return this.alert$;

  }

  clearAlert() {

    this.alert$.next({});

  }

}
