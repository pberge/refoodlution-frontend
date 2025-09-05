import { FormsModule } from '@angular/forms';
import { TranslocoRootModule } from './../transloco-root.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoggedRoutingModule } from './../logged/logged-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformLanguageComponent } from './platform-language/platform-language.component';
import { PricingComponent } from './pricing/pricing.component';
//import { ckeditorComponent } from './ckeditor/ckeditor.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RedsysResponseComponent } from './redsys-response/redsys-response.component';
import { PopupinfoComponent } from './popupinfo/popupinfo.component';



@NgModule({
  declarations: [
    PlatformLanguageComponent,
    PricingComponent,
    CheckoutComponent,
    RedsysResponseComponent,
    PopupinfoComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    FontAwesomeModule,
    TranslocoRootModule,
    FormsModule
  ],
  exports: [
    PlatformLanguageComponent,
    PricingComponent,
    CheckoutComponent,
    PopupinfoComponent
  ]
})
export class SharedModule { }
