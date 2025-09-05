import { TranslocoService } from '@ngneat/transloco';
import { MenuService } from './../../services/menu.service';
import { menuStyle } from './../../classes/menuStyle.enum';
import { Menu } from 'src/app/classes/menu';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-client-menu-item',
  templateUrl: './client-menu-item.component.html',
  styleUrls: ['./client-menu-item.component.scss']
})
export class ClientMenuItemComponent implements OnInit, OnChanges {


  @Input() hideDishes: boolean;
  @Input() menu: Menu;
  @Input() language: string;
  @Input() set userAllergens(userAllergens) {
    this.currentUserAllergens = userAllergens;
  }

  menuStyle = menuStyle;
  currentUserAllergens = [];
  pdf: any[] = [];
  isSafari

  pdfError = '';

  constructor(private menuService: MenuService, private translocoService: TranslocoService) { }

  ngOnInit() {
    console.log("STYLE", this.menuStyle)

    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log("IS SAFARI", this.isSafari)

    this.menu.sections.forEach(section => section.isOpen = true);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pdfError = '';

    if (this.menu.style === this.menuStyle.PdfLocation && this.pdf[this.menu.id] === undefined) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.menuService.getProtectedPdf(this.menu.id, position).subscribe((result) => {
          this.pdf[this.menu.id] = result;
          this.pdfError = '';
        }, (error) => {
          this.pdfError = this.translocoService.translate('preview.errorWrongLocation');
        }
        );
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.pdfError = this.translocoService.translate('preview.errorLocationPermission');
            break;
          case error.POSITION_UNAVAILABLE:
            this.pdfError = this.translocoService.translate('preview.errorLocationUnavailable');
            break;
          case error.TIMEOUT:
            this.pdfError = this.translocoService.translate('preview.errorLocationUnavailable');
            break;
        }
      });
    }

    if (this.menu.style === this.menuStyle.Pdf && this.pdf[this.menu.id] === undefined) {

      this.menuService.getPdf(this.menu.id).subscribe((result) => {
        this.pdf[this.menu.id] = result;
        this.pdfError = '';
      }, (error) => {

      });
    }
  }

  getPdf() {
    return this.pdf[this.menu.id];
  }


  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  isPdfMenu() {
    return (this.menu.style === menuStyle.PdfLocation || this.menu.style === menuStyle.Pdf);
  }

}
