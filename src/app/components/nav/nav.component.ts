import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  constructor() { }

  @Output() refresh = new EventEmitter<any>();

  doRefresh() {
    this.refresh.emit(true);
  }

  ngOnInit(): void {
  }

}
