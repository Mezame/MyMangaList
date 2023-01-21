import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { MmlIconComponent } from '@components/icon/icon.component';
import { Alert } from './alert';
import { AlertsService } from '@services/alert/alerts.service';


@Component({
  selector: 'mml-alert',
  standalone: true,
  imports: [CommonModule, MmlIconComponent],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class MmlAlertComponent implements OnInit, OnDestroy {

  alert$?: Observable<Alert>;

  alertIcon?: string;

  sub!: Subscription;

  constructor(private alertsService: AlertsService) { }

  ngOnInit(): void {

    this.sub = this.alertsService.getAlert().subscribe(a => {

      if (a.type && a.message) {

        this.setIcon(a.type);

        this.showAlert();

      }

    });

  }

  ngOnDestroy(): void {
    
    this.sub.unsubscribe;

  }

  showAlert() {

    this.alert$ = this.alertsService.getAlert();

    setTimeout(() => {

      this.hideAlert();

    }, 5500);

  }

  hideAlert() {

    this.alert$ = undefined;

    this.alertsService.clearAlert();

  }

  setIcon(alertType: string) {

    switch (alertType) {

      case 'info':

        this.alertIcon = 'info';

        break;

      case 'success':

        this.alertIcon = 'check_circle';

        break;

      case 'warning':

        this.alertIcon = 'warning';

        break;

      case 'error':

        this.alertIcon = 'error';

        break;

    }

  }

}
