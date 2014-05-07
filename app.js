// Module dependencies

var express    = require("express"),
//var app = express();
mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'rrichert',
    password : '3601642'
});

var app = module.exports = express.createServer();

// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS rrichert', function (err) {
    if (err) throw err;
    connection.query('USE rrichert', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS Player('
                         + 'ID INT NOT NULL AUTO_INCREMENT,'
                         + 'PRIMARY KEY(ID),'
                         + 'FirstName VARCHAR(30),'
                         + 'LastName VARCHAR(30),'
                         + 'Position int'

                         +  ')', function (err) {
                             if (err) throw err;
                         });
    });
});

connection.query('CREATE DATABASE IF NOT EXISTS rrichert', function (err) {
    if (err) throw err;
    connection.query('USE rrichert', function (err) {
 if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS Team('
                         + 'ID INT NOT NULL AUTO_INCREMENT,'
                         + 'PRIMARY KEY(ID),'
                         + 'Name VARCHAR(30),'
                         + 'CoachName VARCHAR(30),'
                         + 'AgeGroup int'

                         +  ')', function (err) {
                             if (err) throw err;
                         });
    });
});
connection.query('CREATE DATABASE IF NOT EXISTS rrichert', function (err) {
    if (err) throw err;
    connection.query('USE rrichert', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS Game('
                         + 'ID INT NOT NULL AUTO_INCREMENT,'
                         + 'PRIMARY KEY(ID),'
                         + 'Date date,'
                         + 'Opponent VARCHAR(30),'
                         + 'WorL varchar(1)'

                         +  ')', function (err) {
                             if (err) throw err;
                         });
        });
});
// Configuration

app.use(express.bodyParser());

// Main route sends our HTML file

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/add/createteam', function(req, res) {
    res.sendfile(__dirname + '/createteam.html');
});

app.get('/add/creategame', function(req, res) {
    res.sendfile(__dirname + '/creategame.html');
});

app.get('/add/createplayer', function(req, res) {
    res.sendfile(__dirname + '/createplayer.html');
});

app.get('/add/addstats', function(req, res) {
    res.sendfile(__dirname + '/addstats.html');
});
app.get('/contact', function(req, res) {
    res.sendfile(__dirname + '/contact.html');
});

app.get('/add', function(req, res) {
    res.sendfile(__dirname + '/add.html');
});



app.get('/about', function(req, res) {
    res.sendfile(__dirname + '/about.html');
});

app.get('/add/getplayer', function(req, res) {
    res.sendfile(__dirname + '/getplayer.html');
});
// Update MySQL database
app.post('/getplayer', function(req, res) {
    console.log(req.body)
    connection.query('select * from Player where LastName= ?', res,
                     function (err, result) {
                         if (err) throw err;
                         res.send('Player information for ' + result.insertId);
                     })});

app.post('/createplayer', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO Player SET ?', req.body,
                     function (err, result) {
                         if (err) throw err;
                         res.send('Player added to database with ID: ' + result.insertId);
                     }
                    );
});
app.post('/createteam', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO Team SET ?', req.body,
                     function (err, result) {
                         if (err) throw err;
                         res.send('Team added to database with ID: ' + result.insertId);
                     })});
                     app.post('/creategame', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO Game SET ?', req.body,
                     function (err, result) {
                         if (err) throw err;
                         res.send('Game added to database with ID: ' + result.insertId);
                     });
});

app.post('/addstats', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO Stats SET ?', req.body,
                     function (err, result) {
                         if (err) throw err;
                         res.send('Stats added to database with PlayerID: ' + result.playerid); //result.insertId);
                     });
});

// Begin listening

app.listen(8018);
console.log("Express server listening on port %d in %s mode", app.settings.env);




