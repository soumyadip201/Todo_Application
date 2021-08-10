const express = require('express');
const app = express();
const port = 3000;
const expressLayout = require('express-ejs-layouts');
const mongoosedb = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayout);

//extract style and scripts from sub-pages into the layout.ejs
app.set('layout extractStyles', true); //for css
app.set('layout extractScripts', true); //for js

//use express routers
app.use('/', require('./routes/index.js'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//firing the server :succes or failure
app.listen(port, function (err) {
    if (err) { console.log(`Error in running the server : ${err}`); }
    console.log(`Server is up and running on port: ${port}`);
});