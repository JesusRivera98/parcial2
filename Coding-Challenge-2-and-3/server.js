const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const uuid = require( 'uuid' );

const app = express();

const {Sports} = require('./models/sport-model');

/* Your code goes here */
app.delete('/sports/delete', jsonParser, (req, res) => {
    let id  = req.body.id;
    let sportId = req.query.sportId;

    if(!id){
        res.statusMessage = "Necesitas un id en el body para eliminar.";
        return res.status(406).end();
    }
    if(!sportId){
        res.statusMessage = "Necesitas un id en el query string para eliminar.";
        return res.status(406).end();
    }
    if(id != sportId){
        res.statusMessage = "El id del body el el sportId del query deben ser iguales.";
        return res.status(409).end();
    }
    
    Sports
        .deleteSport(sportId)
        .then(result =>{
            return res.status(204).end();
        })
        .catch(err => {
            return res.status(404).end();
        })      
})

app.post('/sports/post', (req, res) =>{
    id = uuid.v4();
    name = req.query.name;
    num = req.query.num;

    let sport = {
        id : id,
        name : name,
        num_players : num
    }

    Sports
        .postSport(sport)
        .then(result => {
            return res.status(204).json(result);
        })
})


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});