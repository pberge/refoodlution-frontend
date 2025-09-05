import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { environment } from '../environments/environment';
import { LoggedModule } from './logged/logged.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ClientMenuComponent } from './preview/client-menu/client-menu.component';
import { ClientMenuItemComponent } from './preview/client-menu-item/client-menu-item.component';
import { ClientMenuRowComponent } from './preview/client-menu-row/client-menu-row.component';
import { ClientCardMenuComponent } from './preview/client-card-menu/client-card-menu.component';
import { ckeditorComponent } from './shared/ckeditor/ckeditor.component'

import { TranslocoRootModule } from './transloco-root.module';
import { RecoverComponent } from './recover/recover.component';
import { FullPdfViewerComponent } from './preview/full-pdf-viewer/full-pdf-viewer.component';
import { QRGeneratorComponent } from './preview/qr-generator/qr-generator.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { PopupinfoComponent } from './shared/popupinfo/popupinfo.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

export function getToken() {
   return localStorage.getItem('auth_token');
}

registerLocaleData(localeEs);

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignUpComponent,
      ClientMenuComponent,
      ClientMenuItemComponent,
      ClientMenuRowComponent,
      RecoverComponent,
      ClientCardMenuComponent,
      FullPdfViewerComponent,
      ckeditorComponent,
      QRGeneratorComponent,
      ConfirmEmailComponent
   ],
   imports: [
      LoggedModule,
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PipesModule,
      NgxQRCodeModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: getToken,
            whitelistedDomains: [environment.api]
         }
      }),
      TranslocoRootModule,
      SharedModule,
      PdfViewerModule,
      NgImageFullscreenViewModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]

})
export class AppModule { }
