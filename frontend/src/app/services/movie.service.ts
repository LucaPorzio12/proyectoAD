import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/movie";


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private URI = 'http://localhost:3000/api/movies/';

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.URI);
  }

  addMovie(movie: Movie): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.URI, movie)
  }

  updateMovie(movie: Movie): Observable<ResponseApiFull> {
    return this.http.patch<ResponseApiFull>(this.URI + movie._id, movie)
  }

  deleteMovie(id: String): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(this.URI + id)
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.URI + 'genres')
  }
}

interface ResponseApi {
  status: string;
}

interface ResponseApiFull {
  status: string;
  data: Movie
}


