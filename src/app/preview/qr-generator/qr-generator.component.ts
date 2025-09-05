import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QRGeneratorComponent implements OnInit {

  constructor() { }

  @ViewChild('myQr', { read: ElementRef }) myQr: ElementRef;
  @ViewChild('aDownload') download: ElementRef;

  faAngleDown = faAngleDown;
  restId = 0;
  qrUrl = 'https://www.refoodlution.com';
  qrImage = '';

  ngOnInit() {
    
  }

  toggleActive(event) {
    event.classList.toggle('is-active');
  }

  downloadClick() {
    this.qrImage = document.getElementById('qrDiv').getElementsByTagName('img')[0].src;
  }
}
