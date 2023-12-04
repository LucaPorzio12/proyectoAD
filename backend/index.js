//IMPORTS
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {mongoose} = require('./database');
const {json} = require('express');

//Inicializamos express
const app = express();

//Settings
//Definimos la variable port con el puerto donde escuchará nuestra API
app.set('port', process.env.PORT || 3000);

//Middleware
//Cargamos Morgan para ver la info de las peticiones de la API
app.use(morgan('dev'));
//Cargamos CORS para definir los origenes de las peticiones a la API
app.use(cors());
//Cargamos el JSON
app.use(express.json());

//Routes
//Aquí definiremos los endpoints iniciales de nuestra API
app.use('/api/movies', require('./routes/movie.route'))
app.use('/', (req, res) => res.send('La API está en /api/movies'));

//Arrancamos la API escuchando en el puerto definiendo el PORT
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'))
});