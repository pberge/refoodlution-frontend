import { RestaurantService } from '../../../services/restaurant.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faEnvelope, faCog  } from '@fortawesome/free-solid-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { SubscriptionPlan } from 'src/app/classes/subscription-plan.enum';

@Component({
  selector: 'app-adminrestaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restName = '';
  faMail = faEnvelope;
  faCog = faCog;
  searchText: String;
  restaurants: any[]
  restaurantsTable: any[]

  constructor(private authService: AuthService,private restaurantService: RestaurantService, 
              private translocoService: TranslocoService) { }

  ngOnInit() {
    this.restaurantService.getAdminRestaurants().subscribe(r => {
      console.log("RESTAURANT", r)
      this.restaurants = r
      this.restaurantsTable = r
      this.restaurantsTable = this.restaurants.map(r => {
        r.created_at = this.getDateFormat(new Date(r.created_at)); 
        r.restaurantCreationDate = this.getDateFormat(new Date(r.restaurantCreationDate)); 

        if(r.emailConfirmed == 1) r.emailConfirmed = "Sí"
        else if(typeof r.emailConfirmed === "object" && r.emailConfirmed !== null) {
          if(r.emailConfirmed.data[0] == 1) r.emailConfirmed = "Sí"
          else r.emailConfirmed = "No"
        }
        
        if(r.oldRestaurant == 1) r.oldRestaurant = "Sí" 
        else if(typeof r.oldRestaurant === "object" && r.oldRestaurant !== null) {
          if(r.oldRestaurant.data[0] == 1) r.oldRestaurant = "Sí"
          else r.oldRestaurant = "No"
        }
        
        r.subscription_end = r.subscription_end != 0 ? this.getDateFormat(new Date(r.subscription_end)) : ""
        
        if(r.paymentType == 0) r.paymentType = ""
        else if(r.paymentType == 1) r.paymentType = "Domiciliación bancaria"
        else if(r.paymentType == 2) r.paymentType = "Tarjeta"
        
        r.subscription_plan = this.getPlanName(r.subscription_plan)
        
        r.lastPaymentDate = r.lastPaymentDate != null ? this.getDateFormat(new Date(r.lastPaymentDate)) : ""
        r.creditCardExpiry = r.creditCardExpiry != null ? this.getDateFormat(new Date(r.creditCardExpiry)) : ""

        return r
      });
      
    });
  }

  getPlanName(plan) {
    switch (plan) {
      case SubscriptionPlan.Basic:
        return this.translocoService.translate('pricing.basic_title');

      case SubscriptionPlan.Advanced:
        return this.translocoService.translate('pricing.advanced_title');

      case SubscriptionPlan.Professional:
        return this.translocoService.translate('pricing.professional_title');

      default:
        return 0;
    }
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

  showSearchResults() {
    this.restaurantsTable = this.restaurants.filter(r => r.email.includes(this.searchText) || r.idUser + "" == this.searchText || r.IdRestaurant + "" == this.searchText || r.name == this.searchText)
  }

  changeRestaurantStatus(restaurant, event) {
    console.log("CHANGE", restaurant,event)
    if(restaurant.active) {
      //ACTIVAR!!
      restaurant.active = 1

      this.restaurantService.setActive(restaurant.idRestaurant).subscribe(r => {
        this.restaurantService.cancelSubscription()
      })
    }
    else {
      //DESACTIVAR!!
      restaurant.active = 0
      
      this.restaurantService.setInactive(restaurant.idRestaurant).subscribe(r => {
        this.restaurantService.cancelSubscription()
      })
      //TODO: REvisar el guard del preview, si està desactivat no es pot veure.
    }
  }

  getDateFormat(date) {
    var a = new Date(date * 1000);
    //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth().toString();
    var day = a.getDate().toString();

    if(month.length == 1) month = "0" + month
    if(day.length == 1) day = "0" + day

    return day + "/" + month + "/" + year
  }
}
