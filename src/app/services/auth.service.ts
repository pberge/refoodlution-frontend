import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private router: Router) { }


  login(email: string, password: string) {
    return this.http.post<any>(environment.api + 'login', { email, password });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['login']);
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter();
    // l'undefined del token esta guardat com a string i no com a undefined en si.
    if (!token || token === 'undefined') {
      return false;
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)
    return !tokenExpired;
  }
  

  getIdUsuario() {
    const token = this.jwtHelperService.decodeToken();
    return token.userid;
  }

  getIdRestaurant() {
    const token = this.jwtHelperService.decodeToken();
    return parseInt(token.restaurantid, 10);
  }

  isAdmin() {
    const token = this.jwtHelperService.decodeToken();
    return token.rol === 1;
  }

  isRefoodlutionAdmin(){
    if(window.location.hostname == "panel.refoodlution.com") {
      return this.getIdUsuario() == 653 || this.getIdUsuario() == 667
    }
    else{
      return this.getIdUsuario() == 667 || this.getIdUsuario() == 683 || this.getIdUsuario() == 684
    }
  }

  refreshToken() {

  }

  updateToken(token) {
    localStorage.setItem('auth_token', token);
  }

  loggedOut() {
    return !this.loggedIn();
  }

  getAuthorizationHeader() {
    return 'Bearer ' + this.jwtHelperService.tokenGetter();
  }

  register(user, restaurant) {
    const response = this.http.post<any>(environment.api + 'register', {user, restaurant});
    return response;
  }

  userExists(email) {
    return this.http.get<any>(environment.api + 'exists/' + email);
  }

  sendRecover(email) {
    return this.http.post<any>(environment.api + 'recovermail', {email});
  }

  updateRecover(hash, password) {
    const uploadData = new FormData();
    uploadData.append('hash', hash);
    uploadData.append('password', password);
    return this.http.post<any>(environment.api + 'recover', uploadData);
  }

  promoActive(promo) {
    return this.http.get<any>(environment.api + 'promo/' + promo);
  }

  sendConfirmationEmail(email) {
    return this.http.post<any>(environment.api + 'sendconfirmation', {email});
  }

  sendConfirmationEmailOldRestaurant(email) {
    return this.http.post<any>(environment.api + 'sendconfirmationoldrestaurant', {email});
  }

  sendNewRegisterEmail(email,restaurant) {
    return this.http.post<any>(environment.api + 'sendNewRegisterEmail', {email, restaurant});
  }

  checkConfirmationHash(hash) {
    return this.http.get<any>(environment.api + 'confirmationEmail/' + hash );
  }

  isConfirmedUser(id) {
    return this.http.get<any>(environment.api + 'isconfirmeduser/' + id)
  }

  isConfirmedUserByRestaurant(id) {
    return this.http.get<any>(environment.api + 'isconfirmeduserbyrestaurant/' + id)
  }

  getcreationdate(id) {
    return this.http.get<any>(environment.api + 'getcreationdate/' + id)
  }
}
