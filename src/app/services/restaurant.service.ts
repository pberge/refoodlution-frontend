import { Restaurant } from './../classes/restaurant';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  private restaurant: Restaurant;

  private restChange: EventEmitter<Restaurant> = new EventEmitter();

  emitChange(restaurant) {
    this.restaurant = restaurant;
    this.restChange.emit(restaurant);
  }

  getRestChangeEmiter() {
    return this.restChange;
  }

  get() {
    return this.restaurant;
  }

  set(restaurant) {
    this.restaurant = restaurant;
  }

  getName() {
    return this.http.get<string>(environment.api + 'restaurant/name')
      .pipe(
        catchError(this.handleError)
      );
  }

  updateName(name) {
    return this.http.put<any>(environment.api + 'restaurant/name', { name })
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadHeader(image) {
    const uploadData = new FormData();
    uploadData.append('header', image, image.name);
    return this.http.post(environment.api + 'restaurant/header', uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteHeaderImage() {
    return this.http.delete(environment.api + 'restaurant/header')
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePassword(oldPwd, newPwd) {
    const uploadData = new FormData();
    uploadData.append('oldPwd', oldPwd);
    uploadData.append('newPwd', newPwd);
    return this.http.put(environment.api + 'restaurant/password', uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crida unauth que retorna la info bàsica dels restaurants.
  getRestaurantById(id) {
    return this.http.get<any>(environment.api + 'unauth/restaurant/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }


  getRestaurant() {
    return this.http.get<Restaurant>(environment.api + 'restaurant')
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRestaurant(restaurant) {
    return this.http.put<any>(environment.api + 'restaurant', restaurant)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRestaurants() {
    return this.http.get<any[]>(environment.api + 'restaurant/all')
      .pipe(
        catchError(this.handleError)
      );
  }

    getAdminRestaurants() {
    return this.http.get<any[]>(environment.api + 'restaurant/adminall')
      .pipe(
        catchError(this.handleError)
      );
  }

  addRestaurant(restaurant) {
    return this.http.post<any>(environment.api + 'restaurant/', restaurant)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteRestaurant(restId) {
    return this.http.delete<any>(environment.api + 'restaurant/' + restId)
      .pipe(
        catchError(this.handleError)
      );
  }

  setRestaurant(restId) {
    return this.http.get<any>(environment.api + 'restaurant/set/' + restId)
      .pipe(
        catchError(this.handleError)
      );

  }

  getPromoBenefits() {
    return this.http.get<any>(environment.api + 'restaurant/promobenefits')
      .pipe(
        catchError(this.handleError)
      );
  }

  newSubscription(card) {
    return this.http.post<any>(environment.api + 'restaurant/subscribe', card)
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelSubscription() {
    return this.http.get<any>(environment.api + 'restaurant/unsubscribe')
      .pipe(
        catchError(this.handleError)
      );
  }

  setInactive(restaurant) {
    var params = {
      id: restaurant,
      value:0
    }
    return this.http.put<any>(environment.api + 'restaurant/changerestaurantstatus', params)
    .pipe(
      catchError(this.handleError)
    );
  }

  setActive(restaurant) {
    return this.http.put<any>(environment.api + 'restaurant/changerestaurantstatus', {id: restaurant, value:1})
    .pipe(
      catchError(this.handleError)
    );
  }

  getcreationdate(id) {
    return this.http.get<any>(environment.api + 'restaurant/getcreationdate/' + id)
  }

  getCreditCardExpiryDate(id) {
    return this.http.get<any>(environment.api + 'restaurant/getcreditcardexpirydate/' + id)
  }

  getAutoRenewal(id) {
    return this.http.get<any>(environment.api + 'restaurant/getautorenewal/' + id)
  }

  getOldRestaurantsPendingSendingMail() {
    return this.http.get<any>(environment.api + 'restaurant/getoldrestaurantspendingsendingmail')
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
