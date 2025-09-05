import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-qr-download',
  templateUrl: './qr-download.component.html',
  styleUrls: ['./qr-download.component.scss']
})
export class QrDownloadComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @ViewChild('myQr', { read: ElementRef }) myQr: ElementRef;
  @ViewChild('aDownload') download: ElementRef;

  faAngleDown = faAngleDown;
  restId = 0;
  qrUrl = '';
  qrImage = '';

  ngOnInit() {
    this.restId = this.authService.getIdRestaurant();
    if ([554,555,556,557,558].includes(this.restId)) {
      this.qrUrl = location.origin + '/selector/' + this.restId;
    } else {
      this.qrUrl = location.origin + '/preview/' + this.restId;
    }
  }

  toggleActive(event) {
    event.classList.toggle('is-active');
  }

  downloadClick() {
    this.qrImage = document.getElementById('qrDiv').getElementsByTagName('img')[0].src;
  }
}
