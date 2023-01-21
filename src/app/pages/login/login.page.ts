import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { distinctUntilChanged, map, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mml-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {

  password!: string;

  supportingText = 'Do not enter the password here.';

  hasError = false;

  sub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {

    const cookie = document.cookie;

    if (cookie) {

      if (cookie.includes('XSRF-TOKEN')) this.router.navigateByUrl('');

    }

  }

  ngOnInit(): void {

  }

  login(e: Event) {

    const username = 'Mezame';

    const currentPassword = (e.target as HTMLInputElement).value;

    const previousPassword = this.password;

    if(currentPassword != '' && currentPassword != previousPassword) {

      this.authService.login(username, currentPassword).subscribe(_ => {

        if (this.authService.isLoggedIn) {
  
          this.router.navigateByUrl(this.authService.redirectUrl!);
  
        } else {
  
          this.supportingText = 'The password is not correct.';
  
          this.hasError = true;
  
        }
  
      });

    }

    this.password = currentPassword;

  }

}
