import { RestaurantService } from './../../services/restaurant.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faQrcode, faUtensils, faCarrot, faCheese, faEnvelope, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faQR = faQrcode;
  faDish = faUtensils;
  faCarrot = faCarrot;
  faAllergy = faCheese;
  faRestaurants = faMapMarkerAlt;
  faMail = faEnvelope;

  restName = '';

  confirmedEmail = false
  oldRestaurant = false
  paymentDataAlert = false
  creditCardExpirySoon = false
  creditCardExpired = false
  autoRenewCheck = false

  paymentDataAlertTitle = "config.alertTitle"
  paymentDataAlertDescription = "config.alertDescription1"
  paymentDataAlertButtonText = "config.alertButtonText"
  paymentDataAlertButtonClick(): void {
    this.router.navigate(['configuration']);
  }

  creditCardExpiredTitle = "config.creditCardExpiredTitle"
  creditCardExpiredDescription = "config.creditCardExpiredDescription"
  creditCardExpiredButtonText = "config.creditCardExpiredButtonText"
  creditCardExpiredButtonClick(): void {
    this.router.navigate(['configuration']);
  }

  creditCardExpirySoonTitle = "config.creditCardExpirySoonTitle"
  creditCardExpirySoonDescription = "config.creditCardExpirySoonDescription"
  creditCardExpirySoonButtonText = "config.creditCardExpirySoonButtonText"
  creditCardExpirySoonButtonClick(): void {
    this.router.navigate(['configuration']);
  }

  autoRenewalCheckTitle = "config.autoRenewalCheckTitle"
  autoRenewalCheckDescription = "config.autoRenewalCheckDescription"
  autoRenewalCheckButtonText = "config.autoRenewalCheckButtonText"
  autoRenewalCheckButtonClick(): void {
    this.router.navigate(['configuration']);
  }

  constructor(private authService: AuthService, private restaurantService: RestaurantService,
              private translocoService: TranslocoService,private router: Router,) { }

  ngOnInit() {
    this.authService.isConfirmedUser(this.authService.getIdUsuario()).subscribe(result => {
      if(result) {
        console.log("isConfirmedUser", result)
        if(result.status == "ok" && result.user) {
          var confirmed
          if(result.user.emailConfirmed.data){
            confirmed = result.user.emailConfirmed.data[0]
          }
          else confirmed = result.user.emailConfirmed

          if(confirmed == 1 || result.user.confirmation_hash == null) this.confirmedEmail = true
        }

        //Control datos pago
        this.paymentDataAlert =  sessionStorage.getItem('PaymentDataAlert') == '1'

        //Control fecha de caducidad de tarjetas.
        this.creditCardExpirySoon = sessionStorage.getItem('creditCardExpiryDate') == '1'
        this.creditCardExpired = sessionStorage.getItem('creditCardExpiryDate') == '2'

        //Control autorenew
        this.autoRenewCheck = sessionStorage.getItem('autoRenewCheck') == '1'

        this.restaurantService.getcreationdate(this.authService.getIdRestaurant()).subscribe(result => {
          if(result) {
            console.log(result)
            if(result.status == "ok" && result.restaurant){
              this.oldRestaurant = result.restaurant.oldRestaurant
            }
          }
        })
      }
    });

  }

  vistaPrevia() {
    const restId = this.authService.getIdRestaurant();
    if ([554,555,556,557,558].includes(restId)) {
      window.open('/selector/' + restId, '_blank');
    } else {
      window.open('/preview/' + restId, '_blank');
    }
  }

  getRestName() {
    return this.restaurantService.get().name;
  }
}
