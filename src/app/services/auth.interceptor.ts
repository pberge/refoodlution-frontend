import { tap } from 'rxjs/internal/operators';
import {Injectable, Inject, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);

    const authHeader = auth.getAuthorizationHeader();

    const authReq = req.clone({setHeaders: {Authorization: authHeader} });

    return next.handle(authReq).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
            //Si volem fer algo amb la resposta es fa aqui
            }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                    //En cas de que ens retorni un error de autenticacio retornem a l'usuari la pantalla de login.
                    auth.logout();
                    }
                }
            }
        )
    );
  }
}
