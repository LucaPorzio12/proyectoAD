//IMPORTS
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie.controller');

// Definimos las rutas, teniendo en cuenta el prefijo /api/movies definido en el index.js
router.post('/', movieCtrl.addMovie);
router.get('/',movieCtrl.getMovies);
router.get('/movie/:id', movieCtrl.getMovie);
router.patch('/:id', movieCtrl.updateMovie);
router.delete('/:id', movieCtrl.deleteMovie);
router.get('/genres', movieCtrl.getGenres);
router.get('/title/:title', movieCtrl.getTitles)
router.get('/byGenre/:genre', movieCtrl.getGenre)

module.exports = router;