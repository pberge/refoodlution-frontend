import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { SubscriptionService } from './../../../services/subscription.service';
import { RestaurantService } from './../../../services/restaurant.service';
import { Restaurant } from 'src/app/classes/restaurant';
import { faCreditCard, faLandmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-sub',
  templateUrl: './manage-sub.component.html',
  styleUrls: ['./manage-sub.component.scss']
})
export class ManageSubComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private subscriptionService: SubscriptionService, private router: Router,
              private translocoService: TranslocoService) { }

  restaurant: Restaurant = new Restaurant();

  faCreditCard = faCreditCard;
  faLandmark = faLandmark;
  faSave = faSave;

  key = '';
  signature = '';

  showModal = false;
  showCardModal = false;
  modalMessage = '';
  domiMessage = '';
  domiError = false;

  selectedPlan = 0;

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe((rest) => this.restaurant = rest);
    this.subscriptionService.getConfigurationKey().subscribe((tpvBody) => {
      this.key = tpvBody.Ds_MerchantParameters;
      this.signature = tpvBody.Ds_Signature;
    });
  }


  isTypeSelected(type) {
    return type === this.restaurant.paymentType;
  }

  onDomiSaveClick() {
    if (this.restaurant.bankAccount.length > 20) {
      this.domiError = false;
      this.subscriptionService.putDomiciliacio({ domiciliacio: this.restaurant.bankAccount }).subscribe(() => {
        this.domiMessage = 'Cambios guardados';
        setTimeout(() => this.domiMessage = '', 3000);
      });
    } else {
      this.domiError = true;
    }
  }

  onTarjetaClick() {
    this.restaurant.paymentType = 2;
  }


  getURL() {
    return environment.redsysURL;
  }

  getKey() {
    return this.key;
  }

  getSignature() {
    return this.signature;
  }


  onPlanChange(value: any) {
    if (value.plan !== this.selectedPlan) {
      this.selectedPlan = value.plan;
      this.showModal = true;
    }
  }

  getModalText() {
    if (this.restaurant.subscriptionPlan < this.selectedPlan) {
      return this.translocoService.translate('pricing.increment_plan_modal');
    } else {
      return this.translocoService.translate('pricing.decrement_plan_modal');
    }
  }

  onChangeConfirm() {
    this.subscriptionService.changePlan({ plan: this.selectedPlan }).subscribe(() => {
      this.modalMessage = 'Plan modificado.';
      setTimeout(() => this.router.navigate(['configuration']), 2000);
    })
  }

  onChangeCancel() {
    this.showModal = false;
  }

  habilitarSubscripcion() {
    this.subscriptionService.enable().subscribe(() => {
      setTimeout(() => this.router.navigate(['configuration']), 2000);
    });
  }

  cancelarSubscripcion() {
    this.subscriptionService.cancel().subscribe(() => {
      setTimeout(() => this.router.navigate(['configuration']), 2000);
    });
  }

  onChangeCreditCardClick() {
    this.showCardModal = true;
  }

  onChangeCardCancel() {
    this.showCardModal = false;
  }

  getCardModalText() {
    return this.translocoService.translate('pricing.card_change_modal')
  }
}
