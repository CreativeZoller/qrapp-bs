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
  submitted = false;
  codeErrors: number = 0;
  showOriginal = false;
  originalCanvas: any;
  destinationCanvas: any;


  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.qrCodeForm = this.fb.group(
      {
        basicText: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
        basicWidth: ['', [Validators.required, Validators.min(340), Validators.max(1024)]],
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
  get basicColorDark() {
    return this.qrCodeForm.get('basicColorDark');
  }
  get basicColorLight() {
    return this.qrCodeForm.get('basicColorLight');
  }

  resetForm(): void {
    this.showMoreSettings();
    this.qrCodeSettings = {};
    if (this.destinationCanvas && this.destinationCanvas.hasChildNodes()) {
      this.destinationCanvas.removeChild(this.destinationCanvas.childNodes[0]);
    }
  }

  qrCodeSubmit() {
    this.submitted = true;
    let formValues;
    formValues = this.qrCodeForm.getRawValue();

    if (this.qrCodeForm.invalid) {
      return;
    }

    if (formValues.basicText) { // title check
      if (formValues.basicText.length >= 4 || formValues.basicText.length <= 260) {
        this.qrCodeSettings = { ...this.qrCodeSettings, text: formValues.basicText }
      } else { this.codeErrors++ }
    }

    if (formValues.basicWidth) { // width check
      if (formValues.basicWidth <= 1024 || formValues.basicWidth >= 340) {
        this.qrCodeSettings = { ...this.qrCodeSettings, width: formValues.basicWidth }
        this.qrCodeSettings = { ...this.qrCodeSettings, height: formValues.basicWidth }
      } else { this.codeErrors++ }
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

    this.createCode();
  }

  createCode() {
    if (this.codeErrors == 0) {
      const canvasIsFine = this.checkCanvas();
      if (canvasIsFine) {
        this.drawCode(this.qrCodeSettings);
      }
    }
  }

  checkCanvas() {
    const originalContent = document.querySelectorAll('canvas');
    if (originalContent.length > 0) {
      originalContent[0].remove();
      return true;
    } else {
      return true;
    }
  }

  drawCode(options: any) {
    new QRCode(this.qrcode.nativeElement, options);
    if (document.querySelector('canvas')) {
      this.originalCanvas = document.querySelector('canvas');
      this.checkDimensions(this.originalCanvas);
    }
  }

  checkDimensions(canvas: any) {
    const width = canvas.width;
    const height = canvas.height;
    if (width === height) {
      this.cloneCanvas(document.getElementById('previewCanvas'));
    } else {
      canvas.height = canvas.width;
      this.cloneCanvas(document.getElementById('previewCanvas'));
    }
  }

  cloneCanvas(identifier: any) {
    this.destinationCanvas = identifier;
    const destination = this.destinationCanvas;
    if (destination.hasChildNodes()) {
      destination.removeChild(destination.childNodes[0]);
    }
    let image = new Image();
    image.className = 'img-fluid';
    image.src = this.originalCanvas.toDataURL();
    if (destination) {
      destination.appendChild(image);
    }
  }
}
