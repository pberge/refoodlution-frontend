import { TranslocoService, translate } from '@ngneat/transloco';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-platform-language',
  templateUrl: './platform-language.component.html',
  styleUrls: ['./platform-language.component.scss']
})
export class PlatformLanguageComponent implements OnInit {

  constructor(private translocoService: TranslocoService) { }

  @Input() isUp = false;
  @Output() langChange: EventEmitter<string> = new EventEmitter<string>();

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  isDropdownLanguageClicked = false;

  availableLanguages = [];
  translocoLangs = [];

  currentLang = 'es';

  ngOnInit(): void {
    this.translocoLangs = this.translocoService.getAvailableLangs();
    this.currentLang = this.translocoService.getActiveLang();
    this.loadLangNames();
  }

  setActiveLang(lang) {
    this.translocoService.setActiveLang(lang.code);
    this.langChange.emit(lang.code);
    this.currentLang = lang.code;
    setTimeout(() => { this.loadLangNames(); }, 700);
  }

  loadLangNames() {
    this.availableLanguages = [];

    this.translocoLangs.forEach(lang => {
      const name = this.translocoService.translate('languages.' + lang, {}, this.currentLang);
      this.availableLanguages.push({ code: lang, name });
    });

    // Ordeno els idiomes alfabèticament.
    this.availableLanguages.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
  }

  getLangName(lang) {
    return lang.name;
  }

  getCurrentName() {
    return translate('languages.' + this.currentLang);
  }

}
