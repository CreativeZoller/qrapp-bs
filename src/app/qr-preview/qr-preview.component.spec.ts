import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPreviewComponent } from './qr-preview.component';

describe('QrPreviewComponent', () => {
  let component: QrPreviewComponent;
  let fixture: ComponentFixture<QrPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
