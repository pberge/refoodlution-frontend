import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserLang() {
    return this.http.get<any>(environment.api + 'user/lang')
      .pipe(
        catchError(this.handleError)
      );
  }

  setUserLang(lang) {
    return this.http.put<any>(environment.api + 'user/lang', {lang})
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers() {
    return this.http.get<any[]>(environment.api + 'user/all')
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
    return throwError(
      'Something bad happened; please try again later.');
  }
}
