import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentApplicationVersion: string;
  currentApplicationCodeName: string;
  currentApplicationTitle: string;

  constructor() {
    this.currentApplicationVersion = environment.appVersion;
    this.currentApplicationCodeName = environment.appCode;
    this.currentApplicationTitle = environment.appName;
  }

  ngOnInit(): void {
  }

}
