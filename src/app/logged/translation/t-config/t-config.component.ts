import { Router } from '@angular/router';
import { TranslationService } from './../../../services/translation.service';
import { TranslocoService } from '@ngneat/transloco';
import { Component, OnInit } from '@angular/core';
import { faSave, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-t-config',
  templateUrl: './t-config.component.html',
  styleUrls: ['./t-config.component.scss']
})
export class TConfigComponent implements OnInit {

  faSave = faSave;

  isSaving = false;

  faCheck = faCheck;
  faCross = faTimesCircle;

  result = { message: '', status: 'hidden' };

  constructor(private translocoService: TranslocoService, private translationService: TranslationService, private router: Router) { }

  languages = [
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
  ];

  userLang = { lang: [], base: '' };

  ngOnInit() {
    // si el restaurant ja te configurat un idioma, el portem a la pagina de traduccions.
    this.translationService.getUserLangs().subscribe((result) => {
      if (result.length !== 0) {
        this.router.navigate(['translation']);
      }
    });

    // Ordeno els idiomes alfabèticament.
    this.languages = this.languages.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));

  }

  onLangClick(lang, event) {
    if (event.target.checked) {
      this.userLang.lang.push(lang.code);
    } else {
      this.userLang.lang = this.userLang.lang.filter((userLang) => userLang !== lang.code);
    }
  }

  onSaveClick() {
    this.isSaving = true;
    const newLang = { lang: this.userLang.lang.join(','), base: this.userLang.base };
    this.translationService.setUserLang(newLang).subscribe(result => {
      this.isSaving = false;
      this.router.navigate(['translation']);
    },
      (err) => {
        this.isSaving = false;
        this.result.message = this.translocoService.translate('error.unsaved');
        this.result.status = 'danger';
      });
  }
}
