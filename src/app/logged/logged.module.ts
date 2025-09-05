import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from './../shared/shared.module';
import { TranslocoRootModule } from './../transloco-root.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipesModule } from './../pipes/pipes.module';
import { SeasoningItemComponent } from './seasonings/seasoning-item/seasoning-item.component';
import { AuthInterceptor } from './../services/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrDownloadComponent } from './qr-download/qr-download.component';
import { MenuCreationComponent } from './menu/menu-creation/menu-creation.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { DaySelectorComponent } from './menu/menu-creation/components/day-selector/day-selector.component';
import { ScheduleSelectorComponent } from './menu/menu-creation/components/schedule-selector/schedule-selector.component';
import { DishCreationComponent } from './dish/dish-creation/dish-creation.component';
import { DishItemComponent } from './dish/dish-item/dish-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeasoningListComponent } from './seasonings/seasoning-list/seasoning-list.component';
import { SeasoningCreationComponent } from './seasonings/seasoning-creation/seasoning-creation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { LoggedRoutingModule } from './logged-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigurationComponent } from './configuration/configuration.component';
import { TConfigComponent } from './translation/t-config/t-config.component';
import { TListComponent } from './translation/t-list/t-list.component';
import { TItemDishComponent } from './translation/t-item-dish/t-item-dish.component';
import { TItemStringComponent } from './translation/t-item-string/t-item-string.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SubscriptionComponent } from './configuration/subscription/subscription.component';
import { ManageSubComponent } from './configuration/manage-sub/manage-sub.component';
import { MenuPdfComponent } from './menu/menu-pdf/menu-pdf.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { RestaurantsComponent } from './admin/restaurants/restaurants.component';
import { PopupinfoComponent } from '../shared/popupinfo/popupinfo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DishListComponent,
    DishItemComponent,
    DishCreationComponent,
    DaySelectorComponent,
    ScheduleSelectorComponent,
    MenuListComponent,
    MenuItemComponent,
    MenuCreationComponent,
    SeasoningCreationComponent,
    SeasoningListComponent,
    SeasoningItemComponent,
    QrDownloadComponent,
    SideNavComponent,
    ConfigurationComponent,
    TConfigComponent,
    TListComponent,
    TItemDishComponent,
    TItemStringComponent,
    RestaurantComponent,
    SubscriptionComponent,
    ManageSubComponent,
    MenuPdfComponent,
    AdminComponent,
    UsersComponent,
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DragDropModule,
    NgxQRCodeModule,
    TranslocoRootModule,
    SharedModule,
    PdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class LoggedModule { }
