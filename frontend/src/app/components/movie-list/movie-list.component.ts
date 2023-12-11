import {Component, OnInit} from '@angular/core';
import {Movie} from "../../common/movie";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  formMovie: FormGroup = this.formBuilder.group(
    {
      _id: [''],
      __v: [0],
      title: [''],
      year: [0],
      director: [''],
      plot: [''],
      poster: [''],
      genres: [],
      imdb: this.formBuilder.group(
        {
          rating: [0],
          votes: [0],
        }
      )
    }
  );

  // Formulario para caundo añadamos un nuevo genero
  myNewGenre = new FormGroup({
    newGenre: new FormControl('')
  });

  genres: string[] = [];

  editar = false;

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadMovies()
  }

  private loadMovies() {
    this.movieService.getMovies().subscribe(
      {
        next: value => {
          this.movies = value
        },
        error: err => {
          console.log(err)
        },
        complete: () => {
          console.log('Done')
        }
      }
    );
    this.movieService.getGenres().subscribe(
      {
        next: value => {
          this.genres = value
        },
        error: err => {
          console.log(err)
        },
        complete: () => {
          console.log('Done')
        }
      }
    );
  }

  // Getters del form
  get title(): any {
    return this.formMovie.get('title')?.value;
  }

  get year(): any {
    return this.formMovie.get('year');
  }

  get director(): any {
    return this.formMovie.get('director');
  }

  get plot(): any {
    return this.formMovie.get('plot');
  }

  get genresF(): any {
    return this.formMovie.get('genres')?.value;
  }

  get poster(): any {
    return this.formMovie.get('poster')?.value;
  }

  get rating(): any {
    return this.formMovie.get('rating');
  }

  get votes(): any {
    return this.formMovie.get('votes');
  }

  get newGenre(): any {
    return this.formMovie.get('newGenre')?.value;
  }

  // Función para actualizar o insertar
  onSubmit() {
    if (this.editar) {
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            this.loadMovies()
            alert(value.status)
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            console.log('Done')
          }
        }
      );
    } else {
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            this.loadMovies()
            alert(value.status)
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            console.log('Done')
          }
        }
      );
    }
  }

  newMovie() {
    this.formMovie.reset();
    this.editar = false;
  }

  loadMovie(movie: Movie) {
    this.formMovie.setValue(movie);
    this.editar = true;
  }

  addNewGenre(newGenre: string) {
    let newGenres;

    if (!this.editar) {
      this.genres.push(newGenre);
    } else {
      newGenres = this.formMovie.getRawValue().genres;
      newGenres.push(newGenre);
      this.genres.push(newGenre);
      this.formMovie.setControl(
        'genres', new FormControl(newGenres));
    }
    this.myNewGenre.reset();
  }

  deleteMovie(movie: Movie) {
    if (confirm('Desea borrar la película ' + movie.title)) {
      this.movieService.deleteMovie(movie._id).subscribe(
        {
          next: value => {
            alert(value.status)
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            console.log('Done')
          }
        }
      );
    }
  }
}
