import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { Menu } from './../classes/menu';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ScheduleConfig } from '../classes/schedules';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenus() {
    return this.http.get<Menu[]>(environment.api + 'menu')
      .pipe(
        catchError(this.handleError)
      );
  }

  addMenu(menu) {
    return this.http.post<Menu>(environment.api + 'menu', menu)
      .pipe(
        catchError(this.handleError)
      );
  }

  addPdfMenu() {
    return this.http.post<Menu>(environment.api + 'menu/pdf', {})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMenu(menu) {
    return this.http.delete(environment.api + 'menu/' + menu.id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMenu(id) {
    return this.http.get<Menu>(environment.api + 'menu/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMenu(menu) {
    return this.http.put<Menu>(environment.api + 'menu', menu)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMenuSelectedDays(menu) {
    return this.http.put<Menu>(environment.api + 'menu/weekdays', menu)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPreview(id, lang, time) {
    return this.http.get<Menu[]>(environment.api + 'unauth/preview/' + id + '?lang=' + lang + '&now=' + time)
      .pipe(
        catchError(this.handleError)
      );
  }

  menuHeader(id): Observable<Blob> {
    return this.http.get(environment.api + 'unauth/header/' + id, { responseType: 'blob' });
  }

  activateMenu(menu) {
    return this.http.put<any>(environment.api + 'menu/activate', menu).pipe(
      catchError(this.handleError)
    );
  }

  getProtectedPdf(id, position) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(environment.api + `unauth/pdfLocation/${id}?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
      { headers, responseType: 'arraybuffer' as 'json' });
  }

  getPdf(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(environment.api + `unauth/pdf/${id}`,
      { headers, responseType: 'arraybuffer' as 'json' });
  }

  uploadPdf(file, id) {
    const uploadData = new FormData();
    uploadData.append('pdf', file, file.name);
    return this.http.post(environment.api + 'menu/pdffile/' + id, uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePositions(menus) {
    return this.http.put<any>(environment.api + 'menu/position', menus)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los horarios de un menú
  getMenuSchedules(menuId: number): Observable<ScheduleConfig[]> {
    return this.http.get<ScheduleConfig[]>(environment.api + `menu/schedules/${menuId}`)
  }

  // Guardar horarios de un menú (reemplaza todos)
  saveMenuSchedules(menuId: number, schedule: ScheduleConfig): Observable<any> {
    return this.http.post(environment.api + `menu/schedules/${menuId}`, { schedule });
  }

  // Update un horario concreto
  updateMenuSchedule(scheduleId: number, schedule: ScheduleConfig): Observable<any> {
    return this.http.put(environment.api + `menu/schedules/${scheduleId}`,  { schedule });
  }

  // Borrar un horario concreto
  deleteMenuSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(environment.api + `menu/schedules/${scheduleId}`);
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
