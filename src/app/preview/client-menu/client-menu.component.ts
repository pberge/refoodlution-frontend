import { TranslocoService } from '@ngneat/transloco';
import { RestaurantService } from './../../services/restaurant.service';
import { Restaurant } from './../../classes/restaurant';
import { faExclamationTriangle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Section } from './../../classes/section';
import { MenuService } from './../../services/menu.service';
import { Menu } from './../../classes/menu';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getBrowserLang } from '@ngneat/transloco';


@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss']
})
export class ClientMenuComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute, private menuService: MenuService, private restaurantService: RestaurantService,
    private router: Router, private translocoService: TranslocoService) { }

  restId: number;
  restaurant: Restaurant = new Restaurant();
  currentLang = 'es';
  img: any;
  faWarning = faExclamationTriangle;
  faMaps = faMapMarkerAlt;
  noMenu = false;

  languages = [];

  menus = [];
  selectedMenu: Menu = new Menu();

  hideDishes = false;
  restName = '';
  sections: Section[];

  allergensList = [
    'NL',
    'BC',
    'AP',
    'AC',
    'AN',
    'AW',
    'AE',
    'AM',
    'ML',
    'UM',
    'BM',
    'AF',
    'AS',
    'AY',
    'AU'
  ];

  selectedAllergens = [];

  ngOnInit() {
    this.getRestaurant();
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllergenStatus(allergen) {
    if (this.selectedAllergens.indexOf(allergen) !== -1) {
      // si hi ha l'alergen retorna on
      return 'on';
    } else {
      return 'off';
    }
  }

  allergenClick(element, allergen) {
    const item = element.target;
    if (item.classList.contains('active')) {
      this.selectedAllergens = this.selectedAllergens.filter(item => item !== allergen);
    } else {
      if (this.selectedAllergens.indexOf(allergen) === -1) {
        // Cal fer el "push" aixi pq l'input del component no detecta el push, sino la nova assignació.
        this.selectedAllergens = [...this.selectedAllergens, allergen];
      }
    }
    item.classList.toggle('active');
  }

  onLanguageClick(lang) {
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
    this.loadMenu();
    setTimeout(() => { this.loadLangNames(); }, 100);
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
        console.log("MENUU LOADED", data)
        this.menus = data;
        // Si l'array ve buit és que no hi ha menus actius
        if (data.length === 0) {
          this.noMenu = true;
        } else {
          // Si ve ple, assignem el 0.
          this.selectedMenu = this.menus[0];
          this.noMenu = false;

          data.forEach(m => {
            m.sections.forEach(s => s.isOpen = true)
          })
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

  loadRestInfo() {
    if (this.restId !== 0 && this.restId !== undefined) {
      console.log(this.restId)
      this.restaurantService.getRestaurantById(this.restId).subscribe(result => {
        console.log("RESTAURANT LOADED", result)
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


  onMenuClick(menu) {
    this.selectedMenu = menu;
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

  getHeader() {
    if (this.img !== undefined) {
      return this.img;
    }
  }

  getLangName(lang) {
    return lang.name;
  }
}
