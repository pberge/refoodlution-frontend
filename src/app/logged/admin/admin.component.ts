import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faQrcode, faUtensils, faCarrot, faCheese, faEnvelope, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  faQR = faQrcode;
  faDish = faUtensils;
  faCarrot = faCarrot;
  faAllergy = faCheese;
  faRestaurants = faMapMarkerAlt;
  faMail = faEnvelope;

  tabs = []
  users = []

  restName = '';

  constructor(private authService: AuthService, private restaurantService: RestaurantService,
              private translocoService: TranslocoService) { }

  ngOnInit() {}

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

  sendEmailToOldRestaurants() {
    this.restaurantService.getOldRestaurantsPendingSendingMail().subscribe(result => {
      this.users = result
      console.log(result)
      //this.users = [{email:"pereberge@gmail.com"}]
      var i = 0
      this.sendEmails(this.users, i, function(){
        console.log("Emails enviats")
      })
      
    })
  }

  sendEmails(emails, i, fncallback) {
    console.log("emails", emails[i])
    this.authService.sendConfirmationEmailOldRestaurant(emails[i].email).subscribe(result =>{
      if(i < this.users.length - 1) {
        console.log("Enviat ", i, emails[i].email)
        i = i + 1
        this.sendEmails(emails, i, fncallback)
      }
      else fncallback()
    }, error => {
      console.log("Error", error, i, emails[i].email)
      if(i < this.users.length - 1) {
        console.log("Enviat ", i, emails[i].email)
        i = i + 1
        this.sendEmails(emails, i, fncallback)
      }
      else fncallback()
    })
  }
}
