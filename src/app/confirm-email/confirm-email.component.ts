import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from './../services/auth.service';
import { pwdMatchValidator } from './../validators/pwdMatch.validator';
import { Restaurant } from './../classes/restaurant';
import { User } from './../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private translocoService: TranslocoService) { }
  
  hash = ''
  confirmedEmail = false
  loading = true

  confirmedEmailTitle = "emailConfirmation.emailConfirmedTitle"
  confirmedEmailDescription = "emailConfirmation.confirmedEmailDescription"
  confirmedEmailButtonText = "emailConfirmation.confirmedEmailText"
  confirmedEmailImg = "assets/success.png"
  buttonColor = "#fed03d"

  noConfirmedEmailTitle = "emailConfirmation.emailConfirmedTitleError"
  noConfirmedEmailDescription = "emailConfirmation.confirmedEmailDescriptionError"
  noConfirmedEmailButtonText = "emailConfirmation.confirmedEmailTextError"
  noConfirmedEmailImg = "assets/danger.png"

  confirmedEmailButtonClick(): void {
    this.router.navigate(['dashboard']);
  }

  ngOnInit() {
    console.log("Confirmandoemail")
    this.route.url.subscribe(params => {
      if (params[1] !== undefined && params[1].path !== undefined) {
        this.hash = params[1].path;

        this.authService.checkConfirmationHash(this.hash).subscribe(params => {
          this.loading = false
          console.log("PARAMS", params)
          if(params.status == "ok") {
            this.confirmedEmail = true
          }
          else {
            this.confirmedEmail = false
          }
        })

      }
    });
  }
}
