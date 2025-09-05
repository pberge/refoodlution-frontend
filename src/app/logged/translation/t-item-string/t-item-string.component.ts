import { TranslationService } from './../../../services/translation.service';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { StringTranslation } from './../../../classes/string-translation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-t-item-string',
  templateUrl: './t-item-string.component.html',
  styleUrls: ['./t-item-string.component.scss']
})
export class TItemStringComponent implements OnInit {

  constructor(private translationService: TranslationService) { }

  @Input() item: StringTranslation;
  @Input() lang: string;
  @Input() isLoading: boolean;

  faLanguage = faLanguage;
  valueClass = '';

  ngOnInit(): void {
  }

  onValueChange() {
    // si el plat no te traduccio amb l'idioma, l'inicialitzem.
    if (this.item.lang === undefined || this.item.lang == null) {
      this.item.lang = this.lang;
    }

    // Si el valor es res, vol dir que han eliminat la traducció i per tant no es vol traduir. Sino les trads borrades surten en blanc.
    if (this.item.value == '') {
      this.item.value = null;
    }

    this.translationService.setStringTranslation(this.item).subscribe((result) => {
      this.valueClass = 'is-success';
      setTimeout(() => this.valueClass = '', 2000);
    },
      (error) => {
        this.valueClass = 'is-danger';
        setTimeout(() => this.valueClass = '', 2000);
      });
  }

  onTranslateClick() {
    this.translationService.generateTranslation(this.item.originalValue, this.lang).subscribe((result) => {
      this.item.value = result.translation;
      this.onValueChange();
    });
  }

}
