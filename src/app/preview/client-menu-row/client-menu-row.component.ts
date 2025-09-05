import { menuStyle } from './../../classes/menuStyle.enum';
import { TranslocoService } from '@ngneat/transloco';
import { faChevronRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Allergen } from './../../classes/allergen';
import { Contains } from './../../classes/contains.enum';
import { Dish } from './../../classes/dish';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[app-client-menu-row]',
  templateUrl: './client-menu-row.component.html',
  styleUrls: ['./client-menu-row.component.scss']
})
export class ClientMenuRowComponent implements OnInit, DoCheck {


  constructor(private translocoService: TranslocoService) { }

  @Input() newDish: Dish = new Dish();
  @Input() hideDishes = false;
  @Input() noAllergens = false;
  @Input() userAllergens = [];
  @Input() style = menuStyle.Default;
  @Input() menu

  hideNoApto = false;
  dish = new Dish();
  currentUserAllergens = [];
  messages: any[] = [];

  activators = [];
  showDish = true;
  showImage = false;

  faChevronRight = faChevronRight;
  faCamera = faCamera;
  alert: Contains;
  image = '/assets/img/success.png';

  dishImage = undefined;

  ngOnInit() {
    this.activators = [];
    this.messages = [];
    this.showDish = true;

    console.log(this.dish, "style", this.style, "menu", this.menu)


    if(this.menu == 1773 || this.menu == 2075) this.style = menuStyle.viToBeLicors
    if(this.menu == 2077 || this.menu == 2078) this.style = menuStyle.viToBeVins
  }

  updateImage() {
    const baseUrl = '/assets/';
    switch (this.alert) {
      case Contains.Danger:
        return baseUrl + 'danger.png';
      case Contains.Warning:
        return baseUrl + 'warning.png';
      case Contains.Free:
        return baseUrl + 'success.png';
      case Contains.Unknown:
        return baseUrl + 'unknown.png';
    }
  }

  updateAlert() {
    if (!this.dish.allergenDeclared) {
      this.alert = Contains.Unknown;
    } else if (this.dish.allergenFree) {
      this.alert = Contains.Free;
    } else {

      const matchingAllergens = this.dish.allergens.filter(r => this.currentUserAllergens.includes(r.acronym));
      this.alert = Contains.Free;
      this.messages = [];
      this.activators = [];

      if (matchingAllergens.length > 0) {
        matchingAllergens.forEach(allergen => {
          // Si l'alergen té missatge
          if (allergen.message !== 0) {
            this.messages.push({ allergen: 'allergens.' + allergen.acronym, message: 'dish.' + Allergen.getMessage(allergen) });
            // Si no és danger, és que es warning
            if (this.alert < Contains.Danger) {
              this.alert = Contains.Warning;
            }
          } else {
            this.alert = Contains.Danger;
            this.activators.push('allergens.' + allergen.acronym);
          }
        });
      }
      // Cal fer el cast a String pq comparant tal qual per algun motiu creu que son tipus diferents.
      this.showDish = !(String(this.alert) === String(Contains.Danger) && this.hideNoApto);
    }

  }

  ngDoCheck() {
    if (this.newDish !== this.dish) {
      this.dish = this.newDish;
      this.updateAlert();
    }

    if (this.userAllergens !== this.currentUserAllergens) {
      this.currentUserAllergens = this.userAllergens;
      this.updateAlert();
    }

    if (this.hideDishes !== this.hideNoApto) {
      this.hideNoApto = this.hideDishes;
      this.updateAlert();
    }

  }

  get hasMessages(): boolean {
    return this.messages.length !== 0;
  }

  onPhotoClick() {
    this.dishImage = [{
      image: environment.api + 'unauth/dishimage/' + this.dish.id
    }];
    this.showImage = true;
  }

  onClosePhoto() {
    document.body.style.overflow = '';
    this.showImage = false;
  }

  getPhotoURL() {
    return environment.api + 'unauth/dishimage/' + this.dish.id;
  }
}
