import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, MoviePresentation } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  URL_API = 'http://localhost:4000/api/movies';
  URL_FILTER = 'http://localhost:4000/api/movies/filter';

  movie: Movie[];
  movies: MoviePresentation[];

  constructor(private http: HttpClient) {}

  getListOfMovies() {
    return this.movies;
  }

  getMovies(batch, lastKey?) {
    let params = new HttpParams();
    params = params.append('orderByKey', 'true');
    params = params.append('limitToFirst', batch);

    if (lastKey) params = params.append('startAt', lastKey);

    return this.http.get<MoviePresentation[]>(this.URL_API, {
      params: params,
      observe: 'response',
    });
  }

  getMoviesFiltered(batch, filter, lastKey?) {
    let params = new HttpParams();
    params = params.append('orderByKey', 'true');
    params = params.append('limitToFirst', batch);
    params = params.append('genre', filter.genre);
    params = params.append('year', filter.year);
    params = params.append('title', filter.title);
    console.log('filter working front');

    if (lastKey) params = params.append('startAt', lastKey);

    return this.http.get<MoviePresentation[]>(this.URL_FILTER, {
      params: params,
      observe: 'response',
    });
  }

  getMovieById(id) {
    let URL_MOVIE_ID = `http://localhost:4000/api/movies/${id}`;
    let params = new HttpParams();
    params = params.append('Id', id);
    console.log('GetMovieById llamado front');
    return this.http.get<Movie[]>(URL_MOVIE_ID, {
      params: params,
      observe: 'response',
    });
  }
}
