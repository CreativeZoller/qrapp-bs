import { CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'qrapp-bs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('qrapp-bs');
  });

  it(`should have some predefined variables'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isCreated).toBeFalsy();
    expect(app.isFailed).toBeFalsy();
    expect(app.qrErrors).toEqual(0);
  });
});
