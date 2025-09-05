import { FullPdfViewerComponent } from './preview/full-pdf-viewer/full-pdf-viewer.component';
import { ClientCardMenuComponent } from './preview/client-card-menu/client-card-menu.component';
import { RecoverComponent } from './recover/recover.component';
import { ClientMenuComponent } from './preview/client-menu/client-menu.component';
import { QRGeneratorComponent } from './preview/qr-generator/qr-generator.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDataGuardPreview } from './guard/paymentDataPreview.guard';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { confirmedEmailPreviewGuard } from './guard/confirmedEmailPreview.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'recover/:hash', component: RecoverComponent },
  { path: 'selector/:id', component: ClientCardMenuComponent },
  { path: 'preview/pdf/:id', component: FullPdfViewerComponent, canActivate: [/*PaymentDataGuardPreview,*/ confirmedEmailPreviewGuard] },
  { path: 'preview/:id', component: ClientMenuComponent, canActivate: [/*PaymentDataGuardPreview,*/ confirmedEmailPreviewGuard]  },
  { path: 'qrgenerator', component: QRGeneratorComponent },
  { path: 'confirmationemail/:hash', component: ConfirmEmailComponent },
  { path: '**', redirectTo: '', component: LoginComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
