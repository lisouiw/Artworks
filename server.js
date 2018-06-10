const express = require('express');
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ART' //mysql database name
});

connection.connect(function (err) {
    if (err !== null) {
        console.log('You are now not connected...', err)
    } else {
        console.log('You are now connected...')
    }
})

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


//////////////////////////////////////// AUTHOR API ///////////////////////////////////////////

// Créer un auteur

app.post('/authors', (request, response) => {
    var req = request.query;
    connection.query('INSERT INTO `AUTHOR` (`lastname`, `firstname`) VALUES (?, ?)', [req.firstname, req.lastname
    ], function (err, result) {
        if (err === null) {
            response.json(req);
        } else {
            response.json(err);
        }
    });
})

// Récupérer un auteur

app.get('/authors/:id', (request, response) => {
    connection.query(`SELECT lastname, firstname from AUTHOR WHERE id=${request.params.id}`, function (err, result) {
        if (err === null) {
            response.json(result);
        } else {
            response.json(err);
        }
    });
})

// Mettre à jour un auteur

app.patch('/authors/:id', (request, response) => {
    connection.query(`UPDATE AUTHOR SET lastname='${request.query.lastname}', firstname='${request.query.firstname}' WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.query);
        else
            response.json(err);
    });
})

// Supprimer un auteur

app.delete('/authors/:id', (request, response) => {
    connection.query(`DELETE FROM AUTHOR WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.params.id);
        else
            response.json(err);
    });
})

// Récupérer toutes les oeuvres d’art d’un auteur

app.get('/authors/artworks/:id', (request, response) => {
    connection.query(`SELECT translation_default_id from ARTWORK WHERE author_id=${request.params.id}`, function (err, result) {
        if (err === null) {
            response.json(result);
        } else {
            response.json(err);
        }
    });
})

//////////////////////////////////////// ARTWORK API ///////////////////////////////////////////

// Créer une oeuvre d'art

app.post('/artworks', (request, response) => {
    var req = request.query;
    connection.query('INSERT INTO ARTWORK (author_id, translation_default_id) VALUES (?, ?)', [req.author_id, req.translation_default_id
    ], function (err, result) {
        if (err === null) {
            response.send(req);
        } else {
            response.send(err);
        }
    });
})

// Récupérer une oeuvre d'art

app.get('/artworks/:id', (req, res) => {
    res.json('bou');
})

// Mise à jour une oeuvre d'art

app.patch('/artworks/:id', (request, response) => {
    connection.query(`UPDATE ARTWORK SET author_id='${request.query.author_id}', translation_default_id='${request.query.translation_default_id}' WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.query);
        else
            response.json(err);
    });
})

// Supprimer une oeuvre d'art

app.delete('/artworks/:id', (request, response) => {
    connection.query(`DELETE FROM ARTWORK WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.params.id);
        else
            response.json(err);
    });
})


///////////////////////// ARTWORK TRANSLATION API //////////////////////////////////

// Créer une traduction d’oeuvre d’art

app.post('/artworks/translation', (request, response) => {
    var req = request.query;
    connection.query('INSERT INTO TRANSLATION (artwork_id, lang, translation) VALUES (?, ?, ?)', [req.artwork_id, req.lang, req.translation
    ], function (err, result) {
        if (err === null) {
            response.json(req);
        } else {
            response.json(err);
        }
    });
})

// Récupérer une traduction d’oeuvre d’art

app.get('/artworks/translation/:id', (request, response) => {
    connection.query(`SELECT lang, translation from TRANSLATION WHERE id=${request.params.id}`, function (err, result) {
        if (err === null) {
            response.json(result);
        } else {
            response.json(err);
        }
    });
})

// Metter à jour une traduction d’oeuvre d’art

app.patch('/artworks/translation/:id', (request, response) => {
    connection.query(`UPDATE TRANSLATION SET artwork_id='${request.query.artwork_id}', lang='${request.query.lang}', translation='${request.query.translation}' WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.query);
        else
            response.json(err);
    });
})

// Supprimer une traduction d’oeuvre d’art

app.delete('/artworks/translation/:id', (request, response) => {
    connection.query(`DELETE FROM TRANSLATION WHERE id=${request.params.id}`, function (err, result) {
        if (err === null)
            response.json(request.params.id);
        else
            response.json(err);
    });
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));