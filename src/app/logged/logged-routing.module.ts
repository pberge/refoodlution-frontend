import { MenuPdfComponent } from './menu/menu-pdf/menu-pdf.component';
import { ManageSubComponent } from './configuration/manage-sub/manage-sub.component';
import { RedsysResponseComponent } from './../shared/redsys-response/redsys-response.component';
import { SubscriptionComponent } from './configuration/subscription/subscription.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { TListComponent } from './translation/t-list/t-list.component';
import { TConfigComponent } from './translation/t-config/t-config.component';
import { AuthGuard } from './../guard/auth.guard';
import { QrDownloadComponent } from './qr-download/qr-download.component';
import { MenuCreationComponent } from './menu/menu-creation/menu-creation.component';
import { DishCreationComponent } from './dish/dish-creation/dish-creation.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeasoningListComponent } from './seasonings/seasoning-list/seasoning-list.component';
import { SeasoningCreationComponent } from './seasonings/seasoning-creation/seasoning-creation.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../guard/admin.guard';
import { UsersComponent } from './admin/users/users.component';
import { confirmedEmailGuard } from '../guard/confirmedEmail.guard';
import { PaymentDataGuard2 } from '../guard/paymentData2.guard';
import { CreditCardExpiryGuard } from '../guard/creditCardExpiry.guard';
import { AutoRenewCheckGuard } from '../guard/autoRenewCheck.guard';


const routes: Routes = [
  {
    path: '',
    component: SideNavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, PaymentDataGuard2, CreditCardExpiryGuard, AutoRenewCheckGuard] },
      { path: 'dish', component: DishListComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'dish/create', component: DishCreationComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'dish/edit/:id', component: DishCreationComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'menu/create', component: MenuCreationComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'menu/createpdf', component: MenuPdfComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'menu', component: MenuListComponent, canActivate: [AuthGuard, confirmedEmailGuard,PaymentDataGuard2 ] },
      { path: 'menu/edit/:id', component: MenuCreationComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'menu/editpdf/:id', component: MenuPdfComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'restaurant/create', component: RestaurantComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'qr-management', component: QrDownloadComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard, confirmedEmailGuard] },
      { path: 'configuration/subscription', component: SubscriptionComponent, canActivate: [AuthGuard, confirmedEmailGuard] },
      { path: 'configuration/submanage', component: ManageSubComponent, canActivate: [AuthGuard, confirmedEmailGuard] },
      { path: 'translation', component: TListComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'translation/config', component: TConfigComponent, canActivate: [AuthGuard, confirmedEmailGuard, PaymentDataGuard2] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]  },
      { path: 'admin/clientes', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]  },
      { path: 'subscription/responses', component: RedsysResponseComponent, data: { response: 'ok' } },
      { path: 'subscription/responsee', component: RedsysResponseComponent, data: { response: 'ko' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard, PaymentDataGuard2, CreditCardExpiryGuard, AutoRenewCheckGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
