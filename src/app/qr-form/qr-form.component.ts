import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import QRCode from "easyqrcodejs";

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.css']
})
export class QrFormComponent implements OnInit, AfterViewInit {
  @ViewChild('qrcode', {static: false}) qrcode!: ElementRef;
  onlyBasicVisible = true;
  qrCodeSettings = <any>{};
  qrCodeForm!: FormGroup;
  codeSubmitted = false;
  codeErrors: number = 0;
  showOriginal = false;


  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.qrCodeForm = this.fb.group(
      {
        basicText: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
        basicWidth: ['256', [Validators.required, Validators.min(0), Validators.max(1024)]],
        basicHeight: ['256', [Validators.min(0), Validators.max(1024)]],
        basicEqualSizes: ['', []],
        basicColorDark: ['#000000', [Validators.pattern('^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')]],
        basicColorLight: ['#ffffff', [Validators.pattern('^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')]],
        },  
        { 
          updateOn: 'change'
        }
    );
  }

  ngAfterViewInit() {
    const options = {
      text: "https://github.com/ushelp/EasyQRCodeJS"
    }
  }

  showMoreSettings(): void {
    this.onlyBasicVisible = !this.onlyBasicVisible;
  }

  get basicText() {
    return this.qrCodeForm.get('basicText');
  }
  get basicWidth() {
    return this.qrCodeForm.get('basicWidth');
  }
  get basicHeight() {
    return this.qrCodeForm.get('basicHeight');
  }
  get basicEqualSizes() {
    return this.qrCodeForm.get('basicEqualSizes');
  }
  get basicColorDark() {
    return this.qrCodeForm.get('basicColorDark');
  }
  get basicColorLight() {
    return this.qrCodeForm.get('basicColorLight');
  }

  resetForm(): void {
    this.showMoreSettings();
    this.qrCodeSettings = {};
  }

  qrCodeSubmit() {
    this.codeSubmitted = true;
    let formValues;
    formValues = this.qrCodeForm.getRawValue();

    if (formValues.basicText) { // title check
      if (formValues.basicText.length > 4 || formValues.basicText.length < 260) {
        this.qrCodeSettings = { ...this.qrCodeSettings, text: formValues.basicText }
      } else { this.codeErrors++ }
    }

    if (formValues.basicWidth) { // width check
      if (formValues.basicWidth < 1024 || formValues.basicWidth > 0) {
        this.qrCodeSettings = { ...this.qrCodeSettings, width: formValues.basicWidth }
      } else { this.codeErrors++ }
    }

    if (formValues.basicEqualSizes) { // height and size check
      if (formValues.basicWidth < 1024 || formValues.basicWidth > 0) {
        this.qrCodeSettings = { ...this.qrCodeSettings, height: formValues.basicWidth }
      } else { this.codeErrors++ }
    } else {
      if (formValues.basicHeight) {
        if (formValues.basicHeight < 1024 || formValues.basicHeight > 0) {
          this.qrCodeSettings = { ...this.qrCodeSettings, height: formValues.basicHeight }
        } else { this.codeErrors++ }
      }      
    }

    if (formValues.basicColorDark) { // dark color check
      this.qrCodeSettings = { ...this.qrCodeSettings, colorDark: formValues.basicColorDark }
    } else {
      this.qrCodeSettings = { ...this.qrCodeSettings, colorDark: '#000000' }
    }

    if (formValues.basicColorLight) { // light color check
      this.qrCodeSettings = { ...this.qrCodeSettings, colorLight: formValues.basicColorLight }
    } else {
      this.qrCodeSettings = { ...this.qrCodeSettings, colorLight: '#ffffff' }
    }

    if (this.codeErrors < 1) new QRCode(this.qrcode.nativeElement, this.qrCodeSettings);
  }
}
