import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-one-movie',
  templateUrl: './one-movie.component.html',
  styleUrls: ['./one-movie.component.sass']
})
export class OneMovieComponent implements OnInit {

  movie = new BehaviorSubject([]);

  @Input() id;

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    if(this.id){
      this.getMovie(this.id);
    }
  }

  ngOnChange(): void {
    if(this.id){
      this.getMovie(this.id);
    }
  }

  getMovie(id) {
    this.movieService.getMovieById(id)
      .subscribe(res => {
        this.movieService.movie = res.body;
        console.log('data', res.body);
      })
  }



}
