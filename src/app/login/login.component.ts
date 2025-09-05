import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { User } from './../classes/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faLock = faLock;
  faEnvelope = faEnvelope;
  isLoading = false;
  errorCredentials = false;
  loginForm: NgForm;

  user: User = new User();

  constructor(private router: Router, private authService: AuthService, private translocoService: TranslocoService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['dashboard']);
    }
    const browserLang = getBrowserLang();
    const translocoLang = this.translocoService.getActiveLang();
    if (translocoLang !== browserLang) {
      this.translocoService.setActiveLang(browserLang);
    }
  }

  onLoginClick(loginForm: NgForm) {
    if (loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.user.email, this.user.password).subscribe(
        data => {
          if (data.token !== undefined) {
            this.authService.updateToken(data.token);
            this.isLoading = false;
            this.router.navigate(['dashboard']);
          } else {
            this.isLoading = false;
            this.errorCredentials = true;
          }
        },
        err => {
          this.isLoading = false;
          this.errorCredentials = true;
        }
      );
    }
  }

  onRegisterClick() {
    this.router.navigate(['signup']);
  }

  onRecoverClick() {
    this.router.navigate(['recover']);
  }

}
