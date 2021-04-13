const { Pool } = require('pg');
var express = require('express');
var app = express()
const bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'Musica',
    password: '123456789',
    port: 5432,
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})
app.get('/all-info',async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT C.*, G.nombre as "Genero", A.nombre as "Artista", A.foto, 
                    A.nacionalidad, AL.nombre, AL.anio, Al.foto as "Portada"
                FROM "Cancion" C 
                    INNER JOIN "Genero" G 
                        ON C.genero_id = G.id
                    INNER JOIN "Artista_Cancion" AC
                        ON C.id = AC.cancion_id
                    INNER JOIN "Artista" A
                        ON AC.artista_id = A.id
                    INNER JOIN "Album_Cancion" ALC
                        ON C.id = ALC.cancion_id
                    INNER JOIN "Album" AL
                        ON ALC.album_id = AL.id`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/all-info/:id',jsonParser,async function (req, res) {
    const id = parseInt(req.params.id);
    const db = new Pool(config);
    let text = `SELECT C.*, G.nombre as "Genero", A.nombre as "Artista", A.foto, 
                    A.nacionalidad, AL.nombre, AL.anio, Al.foto as "Portada", C.nombre
                FROM "Cancion" C 
                    INNER JOIN "Genero" G 
                        ON C.genero_id = G.id
                    INNER JOIN "Artista_Cancion" AC
                        ON C.id = AC.cancion_id
                    INNER JOIN "Artista" A
                        ON AC.artista_id = A.id
                    INNER JOIN "Album_Cancion" ALC
                        ON C.id = ALC.cancion_id
                    INNER JOIN "Album" AL
                        ON ALC.album_id = AL.id where artista_id= ${id} `;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/artista', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Artista"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/genero', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Genero"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/cancion', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Cancion"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/album', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Album"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/album-cancion', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Album_Cancion"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})
app.get('/artista-cancion', async function (req, res) {
    const db = new Pool(config);
    let text = `SELECT * FROM public."Artista_Cancion"`;
    const respuesta = await db.query(text)
        .then(response => {
            console.log(response.rows)
            return response.rows;
        })
        .catch(e => console.error(e.stack))
        res.send(respuesta);
})


app.listen(8000);
