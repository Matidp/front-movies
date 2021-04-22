import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'front';
  refreshEvent: boolean;

  constructor() {}

  onRefresh(bool: boolean) {  
    this.refreshEvent = bool;
  }

}
