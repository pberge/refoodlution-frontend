import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { RestaurantService } from '../services/restaurant.service';



@Injectable({
  providedIn: 'root'
})
export class AutoRenewCheckGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private subscription: SubscriptionService,
    private restaurant: RestaurantService,
    private router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>|boolean {
      return new Promise<boolean>((resolve, reject) => {
        
        /*
        - Consultar la tarjeta de credito está apunto de caducar para poder avisar al usuario
        */
        this.restaurant.getAutoRenewal(this.auth.getIdRestaurant()).subscribe(result => {
          if(result) {
            console.log(result)
            var expiryDate = result.restaurant.subscription_end
            var autoRenewal = result.restaurant.auto_renewal

            console.log("CHECK AUTORENEW", expiryDate, autoRenewal)

            if(expiryDate && autoRenewal == 0){
              var d = new Date(expiryDate * 1000)
              console.log("DATE", d)

              var currentDate = new Date()
              var twentyDaysTime = new Date(currentDate.getTime() + 20 * 24 * 60 * 60 * 1000)
              
              console.log("TWENTY DAYS", twentyDaysTime, d < twentyDaysTime)
              if( d < twentyDaysTime) {
                //Falta menos de 20 días para que caduque tu subscripción y no tienes el autorenewal configurado
                sessionStorage.setItem('autoRenewCheck', '1')

                resolve(true)
              }
              else{
                sessionStorage.setItem('autoRenewCheck', '0')
                resolve(true)
              }
            }
            else {
              sessionStorage.setItem('autoRenewCheck', '0')
              resolve(true)
            }
          }
        })

        
      }) 

      

    }

  getDaysBetweenDates(date) {
    var createdDate = date
    var created = new Date(createdDate * 1000)
    var today = new Date()

    return (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  }

  isBeforeToday(d) {
    var date = new Date(d)
    var today = new Date()

    return date < today
  }
    
}
