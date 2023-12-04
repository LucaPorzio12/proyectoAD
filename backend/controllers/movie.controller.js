const MovieModel = require('../models/movie.model')

const movieCtrl = {};

movieCtrl.addMovie = async (req, res) => {
    // Creamos el modelo Movie con la informacion del body del mensaje
    const myMovie = new MovieModel(req.body)
    // Con el modelo llamamos a la funcion save para gaurdar la informacion
    await myMovie.save()
        // Si funciona
        .then(() => {
            res.json({status: 'Movie Successfully Inserted'})
            // Si no funciona
        }).catch(err => res.send(err.message))
}

movieCtrl.getMovies = async (req, res) => {
    const movies = await MovieModel
        .find()
        // Si funciona
        .then((data) => {
            res.json(data)
            // Si no funciona
        }).catch(err => res.send(err.message))
}
// Función para buscar una pelicuila por ID
movieCtrl.getMovie = async (req, res) => {
    const movies = await MovieModel
        .findById(req.params.id)
        // Si funciona
        .then((data) => {
            if (data != null) {
                res.json(data)
            } else {
                res.json({status: 'Movie does not exist'})
            }
            // Si no funciona
        }).catch(err => res.send(err.message))
}
// Funcion para actualizar una pelicula por ID
movieCtrl.updateMovie = async (req, res) => {
    const movieData = req.body;
    const movies = await MovieModel
        .findByIdAndUpdate(req.params.id, {$set: movieData}, {new: true})
        // Si funciona
        .then((data) => {
            if (data != null) {
                res.json({status: 'Movie updated successfully', data})
            } else {
                res.json({status: 'Movie does not exist'})
            }
            // Si no funciona
        }).catch(err => res.send(err.message))
}
// Funcion para borrar una pelicula por ID
movieCtrl.deleteMovie = async (req, res) => {
    await MovieModel
        .findByIdAndDelete(req.params.id)
        // Si funciona
        .then((data) => {
            if (data != null) {
                res.json({status: 'Movie deleted successfully', data})
            } else {
                res.json({status: 'Movie does not exist'})
            }
            // Si no funciona
        }).catch(err => res.send(err.message))
}

movieCtrl.getGenres = async (req, res) => {
    const movies = await MovieModel
        .find()
        .distinct('genres')
        // Si funciona
        .then((data) => {
            res.json(data)
            // Si no funciona
        }).catch(err => res.send(err.message))
}
movieCtrl.getTitles = async (req, res) => {
    const movies = await MovieModel
        .find({title: {$regex: req.params.title}})
        // Si funciona
        .then((data) => {
            if (data != null) {
                res.json({status: 'Movie searched successfully', data})
            } else {
                res.json({status: 'Movie does not exist'})
            }
            // Si no funciona
        }).catch(err => res.send(err.message))
}
movieCtrl.getGenre = async (req, res) => {
    const movies = await MovieModel
        .find({genres: {$all: req.params.genre.split(',')}})
        // Si funciona
        .then((data) => {
            res.json(data)
            // Si no funciona
        }).catch(err => res.send(err.message))
}

module.exports = movieCtrl