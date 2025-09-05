import { faCreditCard, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SubscriptionService } from './../../../services/subscription.service';
import { RestaurantService } from './../../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/classes/restaurant';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private subscriptionService: SubscriptionService, private router: Router) { }

  restaurant: Restaurant = new Restaurant();

  selectedPlan = 0;
  porTi = false;
  isMonthly = true;
  faCreditCard = faCreditCard;
  faLandmark = faLandmark;

  paymentType = 0;

  freemonth = 0;
  discount = 0;

  promo = 0;

  cancelationMessage = false;

  ngOnInit(): void {

    this.restaurantService.getRestaurant().subscribe((rest) => {
        this.restaurant = rest
        console.log("RESTAURANT", this.restaurant)
        this.selectedPlan = this.restaurant.subscriptionPlan
      }
    );

    this.restaurantService.getPromoBenefits().subscribe(promo => {
      this.freemonth = promo.free_month;
      this.discount = promo.discount;
    });
  }


  onPlanClick(value: any) {
    console.log("PLAN CLICK", value);
    if(!this.restaurant.paymentType) this.restaurant.paymentType = 2

    this.selectedPlan = value.plan != 0 ? value.plan : this.restaurant.subscriptionPlan;
    this.porTi = value.porTi;
    this.isMonthly = value.isMonthly;
  }

  onPaymentTypeClick(type) {
    this.restaurant.paymentType = type;
  }

  isTypeSelected(type) {
    return type === this.restaurant.paymentType;
  }
  
  onCancelarSuscripcionClick() {
    this.subscriptionService.cancel().subscribe((response) => {
      this.cancelationMessage = true;
      setTimeout(() => {
        this.router.navigate(['configuration']);
    }, 2000);

    });
  }


}
