import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDownloadComponent } from './qr-download.component';

describe('QrDownloadComponent', () => {
  let component: QrDownloadComponent;
  let fixture: ComponentFixture<QrDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
