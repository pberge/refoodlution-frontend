import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Component, OnInit, OnChanges,SimpleChanges, Input } from '@angular/core';


@Component({
  selector: 'app-popupinfo',
  templateUrl: './popupinfo.component.html',
  styleUrls: ['./popupinfo.component.scss']
})
export class PopupinfoComponent implements OnInit, OnChanges {

  constructor(private translocoService: TranslocoService, private router: Router ) { }
 
  @Input()
  img: string;
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  buttonText: string;
  @Input()
  buttonClick
  @Input()
  buttonColor:string;
  @Input()
  fullscreen:boolean;

  buttonStyle:string;

  ngOnInit(): void {
    console.log("icon",this.img, this.description)
    if(this.img == "") this.img = "assets/warning.png"
    if(this.buttonColor == "") this.buttonColor = "#ed6755"

    this.buttonStyle = "background-color:" + this.buttonColor+";"
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  
  }

  
}