import { SubscriptionService } from './../../services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redsys-response',
  templateUrl: './redsys-response.component.html',
  styleUrls: ['./redsys-response.component.scss']
})
export class RedsysResponseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, private router: Router) {
    this.response = route.snapshot.data.response;
    this.Ds_SignatureVersion = this.route.snapshot.queryParamMap.get('Ds_SignatureVersion');
    this.Ds_MerchantParameters = this.route.snapshot.queryParamMap.get('Ds_MerchantParameters');
    this.Ds_Signature = this.route.snapshot.queryParamMap.get('Ds_Signature');
  }

  Ds_SignatureVersion = '';
  Ds_MerchantParameters = '';
  Ds_Signature = '';
  response = 'ok';
  faSuccess = faCheckCircle;
  faTimesCircle = faTimesCircle;

  ngOnInit(): void {
    console.log({
      Ds_SignatureVersion: this.Ds_SignatureVersion,
      Ds_MerchantParameters: this.Ds_MerchantParameters,
      Ds_Signature: this.Ds_Signature
    });

    /*this.subscriptionService.setResponse({
      Ds_SignatureVersion: this.Ds_SignatureVersion,
      Ds_MerchantParameters: this.Ds_MerchantParameters,
      Ds_Signature: this.Ds_Signature
    }).subscribe();
*/
    setTimeout(() => {
        this.router.navigate(['dashboard']);
    }, 2000);


  }

}
