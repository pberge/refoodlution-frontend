import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class confirmedEmailPreviewGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>|boolean {
      return new Promise<boolean>((resolve, reject) => {
        console.log("NEXT PARAMS", next)
        if(next.routeConfig.path == "preview/pdf/:id"){
          resolve(true)
        }
        else {
          this.auth.isConfirmedUserByRestaurant(next.params.id).subscribe(result => {
            if(result) {
              console.log("RESULT", result)
              var confirmed
              if(result.user.emailConfirmed.data){
                confirmed = result.user.emailConfirmed.data[0]
              }
              else confirmed = result.user.emailConfirmed

              if(result.status == "ok" && result.user && confirmed == 1) {
                resolve(true)
              }
              else if(result.status == "ok" && result.user && result.user.confirmation_hash == null){
                resolve(true)
              }
              else {
                this.router.navigate(['login']);
                resolve(false)
              }
            }
            else resolve(false)
          })
        }
      }) 

      

    }
}
