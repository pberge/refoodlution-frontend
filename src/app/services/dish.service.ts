import { SeasoningItemComponent } from './../logged/seasonings/seasoning-item/seasoning-item.component';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../classes/dish';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/internal/operators';
import { Seasoning } from '../classes/seasoning';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes() {
    return this.http.get<Dish[]>(environment.api + 'dish')
      .pipe(
        catchError(this.handleError)
      );
  }

  addDish(dish) {
    return this.http.post<Dish>(environment.api + 'dish', dish)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDish(dish) {
    return this.http.delete(environment.api + 'dish/' + dish.id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDish(id) {
    return this.http.get<Dish>(environment.api + 'dish/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDish(dish) {
    console.log("DISH",dish)
    return this.http.put<Dish>(environment.api + 'dish', dish)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSeasoningsFromDish(dish) {
    return this.http.get<Seasoning[]>(environment.api + 'seasoning/dish/' + dish.id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getImage(id): Observable<Blob> {
    return this.http.get(environment.api + 'unauth/dishimage/' + id, { responseType: 'blob' });
  }

  postImage(image, id) {
    const uploadData = new FormData();
    uploadData.append('header', image, image.name);
    uploadData.append('dishid', id)
    return this.http.post(environment.api + 'dish/image', uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteImage(id) { 
    return this.http.delete(environment.api + 'dish/image/' + id)
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
