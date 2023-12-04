const mongoose = require("mongoose");

const URL = 'mongodb+srv://root:root@lucabd.sa1tngp.mongodb.net/misPeliculas?retryWrites=true&w=majority'

mongoose.connect(URL).then(db => console.log('DB Connected')).catch(err => console.error(err));


module.exports = mongoose;