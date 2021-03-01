import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.css']
})
export class QrFormComponent implements OnInit {
  onlyBasicVisible = true;
  qrCodeSettings = {};


  constructor() { }

  ngOnInit() {}

  showMoreSettings(): void {
    this.onlyBasicVisible = !this.onlyBasicVisible;
  }

  resetForm(): void {
    this.showMoreSettings();
  }

    // TODO: add jQuery before Bootstrap in order it to work properly
}
