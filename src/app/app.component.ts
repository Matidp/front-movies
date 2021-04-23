import { Component, Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'front';
  refreshEvent: boolean;
  OneMovie;
  OneMovieId;
  OneMovieSet;

  constructor() {}

  ngOnChanges(): void {
  }

  onRefresh(bool: boolean) {  
    this.refreshEvent = bool;
  }

  OneMovieEvent(Set) {
    console.log({"app component": Set})
    this.OneMovie = Set.value;
    this.OneMovieId = Set.id;
    
  }

}
