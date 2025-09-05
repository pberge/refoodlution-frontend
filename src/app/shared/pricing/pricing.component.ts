import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SubscriptionPlan } from 'src/app/classes/subscription-plan.enum';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(private router: Router, private translocoService: TranslocoService) { }

  // Possibles: advanced, professional.

  @Input() currentPlan = SubscriptionPlan.None;
  @Output() planClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() timeClick: EventEmitter<any> = new EventEmitter<any>();

  monthlyPlan = true;

  porTi = false;

  selectedPlan = SubscriptionPlan.None;

  noPlan = SubscriptionPlan.None;
  basicPlan = SubscriptionPlan.Basic;
  advancedPlan = SubscriptionPlan.Advanced;
  professionalPlan = SubscriptionPlan.Professional;

  ngOnInit(): void {

  }

  onTimePlanClick(monthly) {
    this.monthlyPlan = monthly;
    this.selectedPlan = this.noPlan;
    this.timeClick.emit({ plan: this.selectedPlan , porTi: this.porTi, isMonthly: this.monthlyPlan });
  }

  getPlanPrice(plan) {
    switch(plan) {
      case SubscriptionPlan.Basic:
        return this.monthlyPlan ? 8 : 60;
      case SubscriptionPlan.Advanced:
        return this.monthlyPlan ? 24 : 264;
      case SubscriptionPlan.Professional:
        return this.monthlyPlan ? 34 : 374;
    }
    return 0;
  }

  onPlanClick(plan) {
    this.selectedPlan = plan;
    this.planClick.emit({ plan: this.selectedPlan , porTi: this.porTi, isMonthly: this.monthlyPlan });
  }

  onPortiClick() {
    this.porTi = !this.porTi;
    this.planClick.emit({ plan: this.selectedPlan , porTi: this.porTi, isMonthly: this.monthlyPlan });
  }

  getButtonState(plan) {
    if (this.currentPlan === plan) {
      return this.translocoService.translate('pricing.current');
    } else if (this.selectedPlan === plan) {
      return this.translocoService.translate('pricing.chosen');
    } else {
      return this.translocoService.translate('pricing.choose');
    }
  }
}
