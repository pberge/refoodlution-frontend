import { SubscriptionService } from './../../services/subscription.service';
import { RestaurantService } from './../../services/restaurant.service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { SubscriptionPlan } from './../../classes/subscription-plan.enum';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {

  constructor(private translocoService: TranslocoService, private router: Router, private restaurantService: RestaurantService,
    private subscriptionService: SubscriptionService) { }

  @Input() selectedPlan = SubscriptionPlan.None;
  @Input() porTi = false;
  @Input() isMonthly = true;
  @Input() paymentType = 0;
  @Input() account = '';

  message = '';
  successMessage = '';

  key = '';
  signature = '';

  isLoading = false;

  initialType = undefined;

  freeMonth = 0;
  discount = 0;

  finishText = '';
  continueText = '';

  isAndorrano = false

  ngOnInit(): void {
    this.subscriptionService.getPromoBenefits().subscribe((result) => {
      this.freeMonth = result.free_month;
      this.discount = result.discount;
    })

    this.initialType = this.paymentType;

    this.finishText = this.translocoService.translate('general.finish');
    this.continueText = this.translocoService.translate('general.continue');

    this.restaurantService.getRestaurant().subscribe(restaurant => {
      this.isAndorrano = restaurant.country == "Andorra";
    });
  }


  getPlanPrice() {
    switch (this.selectedPlan) {
      case SubscriptionPlan.Basic:
        return this.isMonthly ? 8 : 60;

      case SubscriptionPlan.Advanced:
        return this.isMonthly ? 24 : 264;

      case SubscriptionPlan.Professional:
        return this.isMonthly ? 34 : 0.1;

      default:
        return 0;
    }
  }

  getPlanName() {
    switch (this.selectedPlan) {
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

  getIgiPrice() {
    let price = this.getPlanPrice() * (1 - (this.discount / 100));
    price = price * 0.045

    return price
  }

  getTotal() {
    let price = this.getPlanPrice() * (1 - (this.discount / 100));
    
    if(this.isAndorrano) {//SI EL PAIS == Andorra  LI SUMEM IGI O NO (4,5%)
      price = price * 1.045
    }

    price = Math.round((price + Number.EPSILON) * 100) / 100;

    if (this.porTi) {
      price += 49;
    }

    

    return price;
  }


  onFinalizarCreditClick() {
    this.isLoading = true;
    this.message = '';

    console.log("clicked", this.key)

    this.subscriptionService.initSubscription(this.key).subscribe(() => { });

  }

  onFinalizarDomiciliacioClick() {
    this.isLoading = true;
    this.message = '';

    if (this.account.length < 20) {
      this.message = 'Número de cuenta no válido';
      this.isLoading = false;
    } else {
      const obj = {
        selectedPlan: this.selectedPlan,
        porTi: this.porTi,
        isMonthly: this.isMonthly,
        bankAccount: this.account
      }

      console.log(obj)
      this.subscriptionService.domiciliacio(obj).subscribe(() => {
        this.message = '';
        this.successMessage = 'Guardado correctamente.';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['dashboard']), 2000);
      }, (error) => {
        this.message = error;
        this.isLoading = false;
      });

    }
  }

  onVolverClick() {
    this.router.navigate(['configuration']);
  }

  ngOnChanges() {
    console.log('changes');

    if (this.selectedPlan !== SubscriptionPlan.None) {
      const obj = {
        plan: this.selectedPlan,
        interval: this.isMonthly ? 'monthly' : 'yearly',
        porTi: this.porTi
      };

      this.subscriptionService.getKey(obj).subscribe((tpvBody) => {
        console.log("KEY", tpvBody)
        this.key = tpvBody.Ds_MerchantParameters;
        this.signature = tpvBody.Ds_Signature;
      });
    }
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

  getContinueText() {
    return this.continueText;
  }

  getFinishText() {
    return this.finishText;
  }

  isFinishDisabled(){
    if (this.account === null) {
      this.account = '';
    }
    return (this.paymentType === 0 || (this.paymentType === 1 &&  this.account.length < 20))
  }
}
