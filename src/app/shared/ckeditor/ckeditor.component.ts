import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import CKEDITOR from 'ckeditor';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class ckeditorComponent implements OnInit {

  constructor(private router: Router, private translocoService: TranslocoService) { }

  // Possibles: advanced, professional.

  ngOnInit(): void {
    //CKEDITOR.replace( 'editor' );
  }

  
}
