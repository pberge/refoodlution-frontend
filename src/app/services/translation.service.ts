import { DishTranslation } from './../classes/dish-translation';
import { StringTranslation } from './../classes/string-translation';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getDishTranslations(lang) {
    return this.http.get<[DishTranslation]>(environment.api + 'translation/dish?lang=' + lang)
    .pipe(
      catchError(this.handleError)
    );
  }

  setDishTranslation(translation) {
    return this.http.put<DishTranslation>(environment.api + 'translation/dish', {dish: translation})
    .pipe(
      catchError(this.handleError)
    );
  }

  getStringTranslations(lang, type) {
    return this.http.get<[StringTranslation]>(environment.api + 'translation/string?type=' + type + '&lang=' + lang)
    .pipe(
      catchError(this.handleError)
    );
  }

  setStringTranslation(translation) {
    return this.http.put<StringTranslation>(environment.api + 'translation/string', translation)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserLangs(){
    return this.http.get<any>(environment.api + 'translation/userlang')
    .pipe(
      catchError(this.handleError)
    );
  }

  setUserLang(lang) {
    return this.http.post<any>(environment.api + 'translation/userlang', lang)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUserLang(lang) {
    lang = lang.join(',');
    return this.http.put<any>(environment.api + 'translation/userlang', {lang})
    .pipe(
      catchError(this.handleError)
    );
  }

  generateTranslation(value, lang) {
    return this.http.post<any>(environment.api + 'translation/generateSingle', { lang, value })
    .pipe(
      catchError(this.handleError)
    );
  }

  generateAllTranslations(lang) {
    return this.http.post<any>(environment.api + 'translation/generateAllTranslations', { lang })
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
