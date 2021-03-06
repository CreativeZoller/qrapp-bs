import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QrFormComponent } from './qr-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('QrFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        QrFormComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(QrFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
