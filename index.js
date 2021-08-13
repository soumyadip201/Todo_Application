// require express for setting up the express server
const express = require('express');

// using express
const app = express();

// set up the port number
const port = 3000;

// importing the DataBase
const mongoosedb = require('./config/mongoose');

// importng the Schema For tasks
const Task = require('./models/task');

// using static files
app.use(express.static('./assets/'));

// to use encrypted data
app.use(express.urlencoded({ extended: true }));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering the App Page
app.get('/', function (req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home",
            task: task
        });
    }
    )
});


// creating Tasks
app.post('/create-task', function (req, res) {
    //  console.log("Creating Task");

    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newtask) {
        if (err) {
            console.log('error in creating task', err);
            return;
        }


        //console.log(newtask);
        console.log('-----------------------', newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function (req, res) {
    // get the id from query
    let id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {

        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back');
});


//firing the server :succes or failure
app.listen(port, function (err) {
    if (err) { console.log(`Error in running the server : ${err}`); }
    console.log(`Server is up and running on port: ${port}`);
});