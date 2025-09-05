import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getKey(obj) {
    return this.http.post<any>(environment.api + 'subscription/getkey', obj)
      .pipe(
        catchError(this.handleError)
      );
  }

  initSubscription(params) {
    return this.http.post<any>(environment.api + 'subscription/init', { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  setResponse(params) {
    return this.http.post<any>(environment.api + 'unauth/redsysresponse', params)
      .pipe(
        catchError(this.handleError)
      );
  }

  enable() {
    return this.http.get<any>(environment.api + 'subscription/enable')
      .pipe(
        catchError(this.handleError)
      );
  }

  cancel() {
    return this.http.get<any>(environment.api + 'subscription/unsubscribe')
      .pipe(
        catchError(this.handleError)
      );
  }

  getCreationDate(id) {
    return this.http.get<any>(environment.api + 'unauth/getcreationdate/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPromoBenefits() {
    return this.http.get<any>(environment.api + 'subscription/promobenefits')
      .pipe(
        catchError(this.handleError)
      );
  }

  testPayment() {
    return this.http.get<any>(environment.api + 'subscription/pagotoken')
      .pipe(
        catchError(this.handleError)
      );
  }

  getRestaurantSubscriptionById(id) {
    return this.http.get<any>(environment.api + 'subscription/domiciliacio/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  domiciliacio(params) {
    return this.http.post<any>(environment.api + 'subscription/domiciliacio', params)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRestaurantSubscriptionByIdPreview(id) {
    return this.http.get<any>(environment.api + 'unauth/domiciliacio/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  putDomiciliacio(params) {
    return this.http.put<any>(environment.api + 'subscription/domiciliacio', params)
    .pipe(
      catchError(this.handleError)
    );
  }

  getConfigurationKey() {
    return this.http.get<any>(environment.api + 'subscription/configurationkey')
    .pipe(
      catchError(this.handleError)
    );
  }

  changePlan(plan) {
    return this.http.put<any>(environment.api + 'subscription/plan', plan)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
