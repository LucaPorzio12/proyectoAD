//IMPORTS
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie.controller');

// Definimos las rutas, teniendo en cuenta el prefijo /api/movies definido en el index.js
router.post('/', movieCtrl.addMovie)




module.exports = router;