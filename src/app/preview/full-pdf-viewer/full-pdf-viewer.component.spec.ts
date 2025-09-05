import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPdfViewerComponent } from './full-pdf-viewer.component';

describe('FullPdfViewerComponent', () => {
  let component: FullPdfViewerComponent;
  let fixture: ComponentFixture<FullPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
