import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { RestaurantService } from '../services/restaurant.service';



@Injectable({
  providedIn: 'root'
})
export class PaymentDataGuardPreview implements CanActivate {
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
        - Consultar si hi ha dades de pagament i ja han passat 14 dies des del registre.
        - Consultar si admin ha donat de baixa aquest restaurant
        */
        this.subscription.getCreationDate(next.params.id).subscribe(result => {
          if(result) {
            console.log(result)
            var days
            var isOldrestaurant = result.restaurant.oldRestaurant

            if(isOldrestaurant.data) {
              isOldrestaurant = isOldrestaurant.data[0]
            }
            
            if(result.restaurant.created_at){
              days = this.getDaysBetweenDates(result.restaurant.created_at)
            }
            else {
              days = 1
            }

            /*
              ELS USUARIS VELLS SEMPRE ELS FUNCIONA.
            */

            this.subscription.getRestaurantSubscriptionByIdPreview(next.params.id).subscribe(result => {
                console.log("RESTAURANT", result)
                console.log("DAYS", days)
                
                if(isOldrestaurant) {
                  sessionStorage.setItem('PaymentDataAlert', '0')
                  resolve(true)
                }
                else if(days > 14) {
                  /*
                  Una vez pasados los 14 días de prueba
                    A. Si tu subscripcion está vigente no pasa nada.
                  */ 
                  console.log("MAS DE 14 DIAS")
                  //subscription_end
                  if(this.isBeforeToday(result.subscription_end) && result.subscription_end > 0) {
                    sessionStorage.setItem('PaymentDataAlert', '0')
                    resolve(true)
                  }
                  else {
                    console.log("PATH",window.location.pathname )
                    /*
                    Si la subscripción está caducada
                      A. Si el usuario es viejo: No lo bloqueamos.
                      B. si el usuario es nuevo: Lo bloqueamos
                    */

                    if(window.location.pathname == "/preview/" + next.params.id){
                      sessionStorage.setItem('PaymentDataAlert', '0')
                      
                      this.router.navigate(['login']);
                      //window.open("https://refoodlution.com", "_blank");
                      resolve(false)
                    }
                    else {
                      //Protección per a que només afecti als restaurants nous
                      if(isOldrestaurant){ //ELIMINAR EN UN FUTURO
                        sessionStorage.setItem('PaymentDataAlert', '1')
                        sessionStorage.setItem('PaymentDataDays', days+'')
                        resolve(true)
                      }
                      else {
                        sessionStorage.setItem('PaymentDataAlert', '1')
                        sessionStorage.setItem('PaymentDataDays', days+'')
                        this.router.navigate(['configuration']);
                        resolve(false)
                      }
                      
                    }
                  }
                }
                else {
                  /*
                  Durante los 14 días de prueba todo funciona bien pero te avisa de que tienes que pagar.
                  */
                  console.log("MENOS DE 14 DIAS")
                  if(this.isBeforeToday(result.subscription_end) && result.subscription_end > 0) {
                    sessionStorage.setItem('PaymentDataAlert', '0')
                    resolve(true)
                  }
                  else {
                    sessionStorage.setItem('PaymentDataAlert', '1')
                    resolve(true)
                  }
                }
            })
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
