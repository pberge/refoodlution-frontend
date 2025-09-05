import { TranslocoService } from '@ngneat/transloco';
import { menuStyle } from './../../../classes/menuStyle.enum';
import { Menu } from './../../../classes/menu';
import { MenuService } from './../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faFilePdf, faBookOpen, faTrash, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-pdf',
  templateUrl: './menu-pdf.component.html',
  styleUrls: ['./menu-pdf.component.scss']
})
export class MenuPdfComponent implements OnInit {

  isEditing = false;
  faPdf = faFilePdf;
  faDelete = faTrash;
  faCheck = faCheck;
  faCross = faTimesCircle;

  menu: Menu;
  pdf: any;
  pdfError = '';

  deleteModal = false;
  isDeleting = false;
  errorMessage = '';
  valueClass = '';

  selectedFile: File;
  pdfUploading = false;

  result = { message: '', status: 'hidden' };


  constructor(private route: ActivatedRoute, private menuService: MenuService, private router: Router,
    private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.menu = new Menu();
    this.menu.style = menuStyle.Pdf;

    this.isEditing = false;
    this.route.url.subscribe(params => {
      if (params[1].path === 'editpdf') {

        // tslint:disable-next-line: new-parens
        this.menuService.getMenu(this.route.snapshot.paramMap.get('id')).subscribe(menu => {
          this.menu = (new Menu).fromJSON(menu);
          if (this.menu.style !== menuStyle.Pdf) {
            this.router.navigate(['menu/edit/' + this.menu.id]);
          } else {
            this.downloadPdf();
          }
        },
          error => this.router.navigate(['menu']));
        this.isEditing = true;
      }
    });
  }


  downloadPdf() {
    this.menuService.getPdf(this.menu.id).subscribe((result) => {
      this.pdf = result;
      this.pdfError = '';
    }, (error) => {

    });
  }

  getPdfButtonText() {
    if (this.pdf === undefined) {
      return this.translocoService.translate('menu.uploadPdf');
    } else {
      return this.translocoService.translate('menu.changePdf');
    }
  }


  getPdf() {
    return this.pdf;
  }

  onDeleteMenuClick() {
    this.deleteModal = true;
  }

  onModalDeleteClick() {
    this.deleteModal = false;
    this.isDeleting = true;
    this.menuService.deleteMenu(this.menu).subscribe((result) => {
      this.isDeleting = false;
      this.errorMessage = '';
      this.router.navigate(['menu']);
      // setTimeout(() => this.router.navigate(['menu']), 2000);
    }, (error) => {
      this.isDeleting = false;
      this.errorMessage = this.translocoService.translate('error.menuDeleted');
    });
  }

  setMenuName() {
    this.menuService.updateMenu(this.menu).subscribe((result) => {
      this.valueClass = 'is-success';
      setTimeout(() => this.valueClass = '', 2000);
    },
      (error) => {
        this.valueClass = 'is-danger';
        setTimeout(() => this.valueClass = '', 2000);
      });
  }



  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.pdfUploading = true;
    debugger
    if (event.target.files[0].size > 5500000) {
      this.pdfUploading = false;
      this.result.message = this.translocoService.translate('error.pdfUploadSize');
      this.result.status = 'danger';
    } else {
      this.menuService.uploadPdf(this.selectedFile, this.menu.id).subscribe(() => {
        this.downloadPdf();
        this.pdfUploading = false;
        this.result.message = this.translocoService.translate('result.pdfUploaded');
        this.result.status = 'success';
        setTimeout(() => this.result.status = 'hidden', 2000);
      },
        (error) => {
          console.error(error)
          debugger
          this.pdfUploading = false;
          this.result.message = this.translocoService.translate('error.pdfUploadSize');
          this.result.status = 'danger';
          setTimeout(() => this.result.status = 'hidden', 2000);
        });
    }
  }

}

