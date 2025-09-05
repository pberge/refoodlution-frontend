import { TranslationService } from './../../../services/translation.service';
import { StringTranslation } from './../../../classes/string-translation';
import { DishTranslation } from './../../../classes/dish-translation';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { Section } from './../../../classes/section';
import { Menu } from 'src/app/classes/menu';
import { TranslocoService } from '@ngneat/transloco';
import { faPlus, faMinus, faEdit, faSave, faChevronRight, faChevronDown, faUtensils, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { Dish } from './../../../classes/dish';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-t-list',
  templateUrl: './t-list.component.html',
  styleUrls: ['./t-list.component.scss']
})
export class TListComponent implements OnInit {

  langAvailable = [
    { code: 'eu', name: this.translocoService.translate('languages.eu') },
    { code: 'ca', name: this.translocoService.translate('languages.ca') },
    { code: 'zh', name: this.translocoService.translate('languages.zh') },
    { code: 'nl', name: this.translocoService.translate('languages.nl') },
    { code: 'en', name: this.translocoService.translate('languages.en') },
    { code: 'fr', name: this.translocoService.translate('languages.fr') },
    { code: 'gl', name: this.translocoService.translate('languages.gl') },
    { code: 'de', name: this.translocoService.translate('languages.de') },
    { code: 'it', name: this.translocoService.translate('languages.it') },
    { code: 'ja', name: this.translocoService.translate('languages.ja') },
    { code: 'pt', name: this.translocoService.translate('languages.pt') },
    { code: 'es', name: this.translocoService.translate('languages.es') },
    { code: 'ru', name: this.translocoService.translate('languages.ru') },
    { code: 'sv', name: this.translocoService.translate('languages.sv') },
    { code: 'ar', name: this.translocoService.translate('languages.ar') },
    { code: 'he', name: this.translocoService.translate('languages.he') },
    { code: 'hi', name: this.translocoService.translate('languages.hi') }
  ];

  langSelected = [];

  currentLang = { code: 'none', name: this.translocoService.translate('languages.es') };

  transDishes: DishTranslation[] = [];
  transDishesTable: DishTranslation[]
  transMenus: StringTranslation[] = [];
  transSections: StringTranslation[] = [];
  searchText= "";

  dishLoading = false;
  menuLoading = false;
  sectionLoading = false;

  faAdd = faChevronRight;
  faMinus = faChevronDown;
  faEdit = faEdit;
  faSave = faSave;
  faMenu = faListAlt;
  faDish = faUtensils;
  faLanguage = faLanguage;

  editingSection = 'dish';


  constructor(private router: Router, private translocoService: TranslocoService, private translationService: TranslationService) { }

  ngOnInit() {

    this.langAvailable = this.langAvailable.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));

    // recuperem els idiomes de l'usuari.
    this.translationService.getUserLangs().subscribe((input) => {
      if (input === null || input.length === 0) {
        this.router.navigate(['translation/config']);
      } else {
        // Trec l'idioma base dels disponibles
        this.langAvailable = this.langAvailable.filter(item => item.code !== input.base);

        if (input.lang.length > 0) {
          const langArray = input.lang.split(',');
          // per cada item de l'usuari, el treiem de disponibles i el posem a selected.
          langArray.forEach((item) => {
            this.langSelected.push(this.langAvailable.find(x => x.code === item));
          });
          this.langAvailable = this.langAvailable.filter(item => !this.langSelected.some(other => item.code === other.code));
          this.currentLang = this.langSelected[0];
        }

        this.getDishes();
      }
    });
  }


  editDish(dish: Dish) {
    this.router.navigate(['dish/edit/' + dish.id]);
  }

  drop(event: CdkDragDrop<string[]>, action) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (action === 'delete') {
        // TODO: avisar del delete.
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateSelectedLang();
    }
  }

  selectLang(lang) {
    this.currentLang = lang;
    if (this.editingSection === 'dish') {
      this.getDishes();
    } else {
      this.getMenus();
      this.getSections();
    }

  }

  updateSelectedLang() {
    const codes = [];
    this.langSelected.forEach(lang => {
      codes.push(lang.code);
    });

    this.translationService.updateUserLang(codes).subscribe(result => {
      this.selectLang(this.langSelected[0]);
    },
      err => {
        console.log(err);
      });
  }

  isSelectedLang(lang) {
    return lang === this.currentLang;
  }

  getDishes() {
    this.dishLoading = true;
    this.translationService.getDishTranslations(this.currentLang.code).subscribe((result) => {
      console.log(result)
      this.transDishes = result;
      this.transDishesTable = result;
      this.dishLoading = false;
    });
  }

  getMenus() {
    this.menuLoading = true;
    this.translationService.getStringTranslations(this.currentLang.code, 'menu').subscribe((result) => {
      this.transMenus = result;
      this.menuLoading = false;
    });
  }

  getSections() {
    this.sectionLoading = true;
    this.translationService.getStringTranslations(this.currentLang.code, 'section').subscribe((result) => {
      this.transSections = result;
      this.sectionLoading = false;
    });
  }

  onEditSectionClick() {
    this.getMenus();
    this.getSections();
    this.editingSection = 'menu';
  }

  onEditDishClick() {
    this.getDishes();
    this.editingSection = 'dish';
  }

  showSearchResults() {
    this.transDishesTable = this.transDishes.filter(dish => {
      if (!this.searchText) return true;

      const queryWords = this.searchText.toLowerCase().split(/\s+/); // separa por espacios

      const textToSearch = `${dish.originalName || ''} ${dish.originalDescription || ''}`.toLowerCase();

      return queryWords.every(word => textToSearch.includes(word));
    });


  }

  onTranslateAllClick() {
    this.dishLoading = true;

    this.translationService.generateAllTranslations(this.currentLang.code).subscribe({
      next: () => {
        
      },
      error: (err) => {
        console.error('Error al traducir', err);
        this.dishLoading = false;
      },
      complete: () => {
          this.getDishes();
          this.dishLoading = false;
      }
    });
  }
}
