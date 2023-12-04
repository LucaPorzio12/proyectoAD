const Movie = require('../models/movie.model')

const movieCtrl = {};

movieCtrl.addMovie = async (req, res) => {
    // Creamos el modelo MOvie con la informacion del body del mensaje
    const myMovie = new Movie(req.body)
    // Con el modelo llamamos a la funcion save para gaurdar la informacion
    await myMovie.save().then(() => {
        // Si funciona
        res.json({status: 'Movie Successfully Inserted'})
        // Si no funciona
    }).catch(err => res.send(err.message))
}

module.exports = movieCtrl