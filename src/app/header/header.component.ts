import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentApplicationVersion: string;
  currentApplicationCodeName: string;
  currentApplicationTitle: string;

  constructor() {
    this.currentApplicationVersion = environment.appVersion;
    this.currentApplicationCodeName = environment.appCode;
    this.currentApplicationTitle = environment.appName;
  }

  ngOnInit(): void {}

}
