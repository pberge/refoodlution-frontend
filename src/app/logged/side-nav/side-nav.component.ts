import { TranslocoService } from '@ngneat/transloco';
import { UserService } from './../../services/user.service';
import { Restaurant } from './../../classes/restaurant';
import { RestaurantService } from './../../services/restaurant.service';
import { AuthService } from './../../services/auth.service';
import {
  faHome, faUtensils, faUtensilSpoon, faQrcode, faCog, faSignOutAlt, faGlobeAfrica, faFlag,
  faLanguage, faChevronDown, faChevronRight, faAngleDown, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private restaurantService: RestaurantService, 
              private userService: UserService, private translocoService: TranslocoService) {}

  faHome = faHome;
  faMenu = faListAlt;
  faDish = faUtensils;
  faSeasoning = faUtensilSpoon;
  faQr = faQrcode;
  faConfig = faCog;
  faExit = faSignOutAlt;
  faGlobe = faGlobeAfrica;
  faFlag = faFlag;
  faLanguage = faLanguage;
  traduccionesIcon = faChevronDown;
  faAngleDown = faAngleDown;
  faAdd = faPlus;

  translationDisplay = 'inherit';
  isHambActive = false;
  isDropdownActive = false;

  restaurants: Restaurant[] = [];
  restSubscription;

  ngOnInit() {
    this.translateOpen();

    this.restaurantService.getRestaurant().subscribe(
      rest => this.restaurantService.set(rest)
    );

    this.restaurantService.getRestaurants().subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    });

    // si ens envien un canvi a restaurants..
    this.restSubscription = this.restaurantService.getRestChangeEmiter()
      .subscribe((rest) => {
        // tornem a demanar el llistat de restaurants
        this.restaurantService.getRestaurants().subscribe((restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        });
      });

    this.userService.getUserLang().subscribe((lang) => {
      this.translocoService.setActiveLang(lang);
    });
  }

  logout() {
    this.authService.logout();
  }

  isMouseOver(isOver: boolean) {
    if (isOver) {
      this.translationDisplay = 'inherit';
      this.traduccionesIcon = faChevronRight;
    } else {
      this.translateOpen();
      this.traduccionesIcon = faChevronDown;
    }
  }

  translateOpen() {
    if (this.router.url === '/translation/list' || this.router.url === '/translation/configuration') {
      this.translationDisplay = 'inherit';
    } else {
      this.translationDisplay = 'none';
    }
  }

  onActivate(event) {
    this.translateOpen();
  }

  onHambClick() {
    this.isHambActive = !this.isHambActive;
  }

  onRestDropdownClick() {
    this.isDropdownActive = !this.isDropdownActive;
  }

  onRestaurantClick(id) {
    // si el rest es diferent de l'actual
    if (id !== this.authService.getIdRestaurant()) {
      // modifiquem el token per dir que estem tractant el restaurant acutal.
      this.restaurantService.setRestaurant(id).subscribe(result => {
        if (result.token !== undefined) {
          this.authService.updateToken(result.token);
          // demanem les dades del rest per actualitzar-lo al service.
          this.restaurantService.getRestaurant().subscribe(
            rest => this.restaurantService.set(rest)
          );

          // const oldUrl = this.router.url;
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            // this.router.navigate([oldUrl]);
            this.router.navigate(['dashboard']);
        });
        }
      });
    }
  }

  getCurrentRestaurant() {
    return this.authService.getIdRestaurant();
  }

  getRestaurantName() {
    if (this.restaurantService.get() !== undefined) {
      return this.restaurantService.get().name;
    } else {
      return '';
    }
  }

  onAddRestaurantClick() {
    this.router.navigate(['restaurant/create']);
  }

  isAdmin() {
    return this.authService.isRefoodlutionAdmin()
  }
}
