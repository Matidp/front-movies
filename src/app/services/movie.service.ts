import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, MoviePresentation } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  URL_API = 'http://localhost:4000/api/movies';

  movie: Movie[];
  movies: MoviePresentation[];

  constructor(private http: HttpClient) {}

  /*
  getMovies() {
    return this.http.get<MoviePresentation[]>(this.URL_API);
  }
  */

  getListOfMovies() {
    return this.movies;
  }

  getMovies(batch, lastKey?, filter?) {
    
    let params = new HttpParams();
    params = params.append('orderByKey', 'true');
    params = params.append('limitToFirst', batch);
    console.log("desde service", filter);
    
    if (filter) {
      params = params.append('genre', filter.genre);
      params = params.append('year', filter.year);
      params = params.append('title', filter.title);
    } 


    if (lastKey) params = params.append('startAt', lastKey);

    return this.http.get<MoviePresentation[]>(this.URL_API, { params: params,
    observe: 'response'});
  }
}
