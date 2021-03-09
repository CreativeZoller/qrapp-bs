import { Component, OnInit } from '@angular/core';
import { CallService } from '../call.service';

@Component({
  selector: 'app-qr-preview',
  templateUrl: './qr-preview.component.html',
  styleUrls: ['./qr-preview.component.css'],
})
export class QrPreviewComponent implements OnInit {
  public subscription: any;
  updateTime: string = '';
  fileName: string = '';
  fileUrl: string = '';

  constructor(
    public util: CallService
  ) { }

  ngOnInit() {
    this.subscription = this.util.getEmit().subscribe(message => {      
      this.updateTime = message[0];
      this.fileName   = message[1];
      this.fileUrl    = message[2];
    });
  }
}
