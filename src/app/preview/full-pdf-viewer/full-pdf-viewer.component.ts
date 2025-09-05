import { MenuService } from './../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-pdf-viewer',
  templateUrl: './full-pdf-viewer.component.html',
  styleUrls: ['./full-pdf-viewer.component.scss']
})
export class FullPdfViewerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private menuService: MenuService) { }

  private routeSub: Subscription;
  pdfId: number;
  pdf: any

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.pdfId = params.id;
      this.loadPdf();
    })
  }

  loadPdf(): void {
       this.menuService.getPdf(this.pdfId).subscribe((result) => {
        this.pdf = result;
    }, (error) => {

    });
  
  }

  getPdf() {
    return this.pdf;
  }

}
