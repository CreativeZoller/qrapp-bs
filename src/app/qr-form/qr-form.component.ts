import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.css']
})
export class QrFormComponent implements OnInit {
  onlyBasicVisible = true;
  qrCodeSettings = {};
  qrCodeForm!: FormGroup;
  codeSubmitted = false;
  codeErrors: number = 0;


  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.qrCodeForm = this.fb.group(
      {
        basicText: ['', [Validators.required, , Validators.minLength(4)]],
      },
      { updateOn: 'change' }
    );
  }

  showMoreSettings(): void {
    this.onlyBasicVisible = !this.onlyBasicVisible;
  }

  get basicText() {
    return this.qrCodeForm.get('basicText');
  }

  resetForm(): void {
    this.showMoreSettings();
  }

  qrCodeSubmit() {
    let formValues;
    formValues = this.qrCodeForm.getRawValue();
    console.dir(formValues);
    // TODO: finish this
  }
}
