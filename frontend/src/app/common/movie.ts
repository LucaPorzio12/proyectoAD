
export type Root = Movie[]

export interface Movie {
  imdb: Imdb
  _id: string
  title: string
  year: number
  director: string
  plot: string
  poster: string
  genres: string[]
  __v: number
}

export interface Imdb {
  rating: string
  votes: string
}
