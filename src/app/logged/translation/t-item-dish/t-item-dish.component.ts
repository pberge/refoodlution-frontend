import { TranslationService } from './../../../services/translation.service';
import { DishTranslation } from './../../../classes/dish-translation';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-t-item-dish',
  templateUrl: './t-item-dish.component.html',
  styleUrls: ['./t-item-dish.component.scss']
})
export class TItemDishComponent implements OnInit {

  constructor(private translationService: TranslationService) { }

  @Input() dish: DishTranslation;
  @Input() lang: string;
  @Input() isLoading: boolean;

  faLanguage = faLanguage;
  nameClass = '';
  descriptionClass = '';
  priceTitleClass = '';
  priceTitle2Class = '';
  priceTitle3Class = '';
  

  ngOnInit(): void {
  }

  onValueChange(field) {
    // si el plat no te traduccio amb l'idioma, l'inicialitzem.
    if (this.dish.lang === undefined || this.dish.lang == null) {
      this.dish.lang = this.lang;
    }

    // Si el valor es res, vol dir que han eliminat la traducció i per tant no es vol traduir. Sino les trads borrades surten en blanc.
    if (this.dish.name == '') {
      this.dish.name = null;
    }
    if (this.dish.description == '') {
      this.dish.description = null;
    }
    if (this.dish.priceTitle == '') {
      this.dish.priceTitle = null;
    }
    if (this.dish.priceTitle2 == '') {
      this.dish.priceTitle2 = null;
    }
    if (this.dish.priceTitle3 == '') {
      this.dish.priceTitle3 = null;
    }

    this.translationService.setDishTranslation(this.dish).subscribe((result) => {
      if (field === 'name') {
        this.nameClass = 'is-success';
        setTimeout(() => this.nameClass = '', 2000);
      }
      else if (field === 'priceTitle') {
        this.priceTitleClass = 'is-success';
        setTimeout(() => this.nameClass = '', 2000);
      }
      else if (field === 'priceTitle2') {
        this.priceTitle2Class = 'is-success';
        setTimeout(() => this.nameClass = '', 2000);
      } 
      else if (field === 'priceTitle3') {
        this.priceTitle3Class = 'is-success';
        setTimeout(() => this.nameClass = '', 2000);
      } 
      else {
        this.descriptionClass = 'is-success';
        setTimeout(() => this.descriptionClass = '', 2000);
      }
    },
      (error) => {
        if (field === 'name') {
          this.nameClass = 'is-danger';
          setTimeout(() => this.nameClass = '', 2000);
        } 
        else if (field === 'priceTitle') {
          this.priceTitleClass = 'is-danger';
          setTimeout(() => this.nameClass = '', 2000);
        } 
        else if (field === 'priceTitle2') {
          this.priceTitle2Class = 'is-danger';
          setTimeout(() => this.nameClass = '', 2000);
        } 
        else if (field === 'priceTitle3') {
          this.priceTitle3Class = 'is-danger';
          setTimeout(() => this.nameClass = '', 2000);
        } 
        else {
          this.descriptionClass = 'is-danger';
          setTimeout(() => this.descriptionClass = '', 2000);
        }
      });
  }

  onTranslateClick(field) {
    console.log("ON TRANSLATE CLICK", field)

    if (field === 'name') {
      this.translationService.generateTranslation(this.dish.originalName, this.lang).subscribe((result) => {
        this.dish.name = result.translation;
        this.onValueChange(field);
      });
    } 
    else if(field === 'priceTitle') {
      this.translationService.generateTranslation(this.dish.originalPriceTitle, this.lang).subscribe((result) => {
        this.dish.priceTitle = result.translation;
        this.onValueChange(field);
      });
    }
    else if(field === 'priceTitle2') {
      this.translationService.generateTranslation(this.dish.originalPriceTitle2, this.lang).subscribe((result) => {
        this.dish.priceTitle2 = result.translation;
        this.onValueChange(field);
      });
    }
    else if(field === 'priceTitle3') {
      this.translationService.generateTranslation(this.dish.originalPriceTitle3, this.lang).subscribe((result) => {
        this.dish.priceTitle3 = result.translation;
        this.onValueChange(field);
      });
    }
    else {
      this.translationService.generateTranslation(this.dish.originalDescription, this.lang).subscribe((result) => {
        this.dish.description = result.translation;
        this.onValueChange(field);
      });
    }
  }

  

}
