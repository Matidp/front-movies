import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';


import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent implements OnInit {
  tables = {
    primary: 'table-primary',
    secundary: 'table-secundary',
    success: 'table-success',
    warning: 'table-warning',
    info: 'table-info',
  };

  

  movies = new BehaviorSubject([]);
  batch = 40;
  lastKey = 0;
  finished = false;
  lastId;
  filter;

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  onScroll() {
    console.log('scrolled!');
    
    this.getMovies();
  }

  private getMovies() {
    if (this.finished) return;
    if (this.filter) return this.onFilter(this.filter); 
    this.movieService.getMovies(this.batch, this.lastKey)
    .pipe(
      tap( movies => {
        console.log(_.last(movies.body)["_id"])
        if (this.lastId == _.last(movies.body)["_id"]) {
          this.finished = true;
        }
        this.lastId = _.last(movies.body)["_id"];
      })
    )
    .subscribe(
      res => {
        const currentMovies = this.movies.value;

        this.movies.next(_.concat(currentMovies, res.body));
        
        this.movieService.movies = this.movies.value;
      }
    )
    this.lastKey += 40;
  }

  private getMoviesFiltered() {
    console.log(this.lastKey);
    if (this.finished) return;
    this.movieService.getMoviesFiltered(this.batch, this.filter, this.lastKey)
    .pipe(
      tap( movies => {
        console.log(_.last(movies.body)["_id"])
        if (this.lastId == _.last(movies.body)["_id"]) {
          this.finished = true;
        }
        this.lastId = _.last(movies.body)["_id"];
        if (this.lastKey == 0) {
          this.movieService.movies = []
        }
      })
    )
    .subscribe(
      res => {
        if (this.lastKey == 0) {
          if(res.body == []) {
            
          }
          console.log("entre aca")
          this.movieService.movies = res.body;
        } else {
          const currentMovies = this.movies.value;
          this.movies.next(_.concat(currentMovies, res.body));
          this.movieService.movies = this.movies.value;
        }
        console.log(this.movieService.movies);
        this.lastKey += 40;
      }
    )
  }

  onFilter(filters: any){
    console.log("parent working")
    console.log(filters);
    if(filters.genre == '' && filters.title == '' && filters.year == '') return;
    this.lastKey = 0;
    this.filter = filters;
    this.getMoviesFiltered();
  }

}



    /*
    this.movieService
      .getMovies(this.batch + 1, this.lastKey)
      .pipe(
        tap((movies) => {
          console.log(_.last(movies)['$key'])
          this.lastKey = _.last(movies)['$key'];
          const newMovies = _.slice(movies, 0, this.batch);

          const currentMovies = this.movies.getValue();

          if (this.lastKey == _.last(newMovies)['$key']) {
            this.finished = true;
          }

          this.movies.next(_.concat(currentMovies, newMovies));
        }),
        take(1)
      )
      .subscribe();
    */

    /*
      .subscribe(
        res => {
          this.movieService.movies = res;
          console.log(res);
        },
        err => console.log(err)
      )
    */