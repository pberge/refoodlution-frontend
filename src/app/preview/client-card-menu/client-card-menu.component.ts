import { Subscription } from 'rxjs';
import { Menu } from './../../classes/menu';
import { Restaurant } from './../../classes/restaurant';
import { faBuilding, faListAlt } from '@fortawesome/free-regular-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { RestaurantService } from './../../services/restaurant.service';
import { MenuService } from './../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faWifi, faHotel, faCocktail, faSwimmer, faRoute, faShuttleVan, faBed, faParking, faBook } from '@fortawesome/free-solid-svg-icons';
import { getBrowserLang } from '@ngneat/transloco';


@Component({
  selector: 'app-client-card-menu',
  templateUrl: './client-card-menu.component.html',
  styleUrls: ['./client-card-menu.component.scss']
})
export class ClientCardMenuComponent implements OnInit {


  private routeSub: Subscription;
  constructor(private route: ActivatedRoute, private menuService: MenuService, private restaurantService: RestaurantService,
    private router: Router, private translocoService: TranslocoService) { }

  faWifi = faWifi;
  faMenu = faCocktail;
  faHotel = faHotel;
  faSpa = faSwimmer;
  faTourism = faRoute;
  faVan = faShuttleVan
  faBed = faBed;
  faParking = faParking;
  faBook = faBook;

  restId: number;
  restaurant: Restaurant = new Restaurant();
  currentLang = 'es';
  img: any;

  menus = [];
  selectedMenu: Menu = new Menu();
  noMenu = false;


  languages = [];


  ngOnInit(): void {
    this.getRestaurant();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onLanguageClick(lang) {
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
    this.loadMenu();
    setTimeout(() => { this.loadLangNames(); }, 100);
  }

  getRestaurant(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.restId = params.id;
      this.translocoService.setActiveLang(this.currentLang);
      this.loadRestInfo();
      this.loadMenu();
      this.downloadHeader();
    });
  }

  loadRestInfo() {
    if (this.restId !== 0 && this.restId !== undefined) {
      console.log("REST ID", this.restId)
      this.restaurantService.getRestaurantById(this.restId).subscribe(result => {
        this.restaurant = result;

        if (result.lang.length > 0) {
          const tempLang = result.lang.split(',');
          tempLang.push(result.base);

          tempLang.forEach(lang => {
            this.languages.push({ code: lang, name: '' });
          });

          const browserLang = getBrowserLang();
          const translocoLang = this.translocoService.getActiveLang();

          if (translocoLang !== browserLang && tempLang.includes(browserLang)) {
            this.translocoService.setActiveLang(browserLang);
            this.currentLang = browserLang;
            this.loadMenu();
          }
          this.loadLangNames();
        }
        // var userLang = navigator.language;
        // console.log(userLang);

      }, error => {
        // TODO: Navigate a pantalla de restaurant inexistent.
        this.router.navigate(['login']);
      });
    }
  }

  loadLangNames() {
    this.languages.forEach(lang => {
      const name = this.translocoService.translate('languages.' + lang.code, {}, this.currentLang);
      lang.name = name;
    });

    // Ordeno els idiomes alfabèticament.
    this.languages.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
  }

  loadMenu() {
    if (this.restId !== 0 && this.restId !== undefined) {
      this.menuService.getPreview(this.restId, this.currentLang, this.getHoraLocal()).subscribe(data => {
        this.menus = data;
        // Si l'array ve buit és que no hi ha menus actius
        if (data.length === 0) {
          this.noMenu = true;
        } else {
          // Si ve ple, assignem el 0.
          this.selectedMenu = this.menus[0];
          this.noMenu = false;
        }
      },
        error => {
          this.noMenu = true;
        }
      );
    }
  }

  getHoraLocal() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }

  getIcon(name) {
    switch(name.toLowerCase()) {
      case 'wifi':
        return this.faWifi;
      case 'restaurant':
        return this.faMenu;
      case 'spa':
        return this.faSpa;
      case 'directori':
        return this.faBook;
      case 'serveis':
        return this.faParking;
      case 'recepcio':
      case 'recepció':
        return this.faHotel;
      case 'turisme':
      case 'turismo':
        return this.faTourism;
      case 'transport':
      case 'transporte':
        return this.faVan;
      default:
        return this.faBook
    }
  }


  redirect(menu): void {
    switch (menu.defaultName.toLowerCase()){
      case 'transport':
      case 'transporte':
        window.location.href = 'https://visitandorra.com/ca/informacio-per-al-visitant/abans-de-venir/transport-public-linies-regulars-nacionals/';
        break
      case 'turisme':
      case 'turismo':
        window.location.href = 'https://www.visitandorra.com'
        break
      default:
        this.router.navigate(['preview/pdf/' + menu.id]);
    }
  }

  downloadHeader() {
    this.menuService.menuHeader(this.restId).subscribe(result => {
      this.createImageFromBlob(result);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getLangName(lang) {
    return lang.name;
  }

  getHeader() {
    if (this.img !== undefined) {
      return this.img;
    }
  }
}
