import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Output() filter = new EventEmitter<any>();

  constructor() { }

  filters = new FormGroup({
    genre: new FormControl(''),
    title: new FormControl(''),
    year: new FormControl('')
  });

  didFilter: Boolean = false;

  doFilter() {
    this.filter.emit(this.filters.value)
    this.didFilter = true;
  }

  ngOnInit(): void {
  }

}
