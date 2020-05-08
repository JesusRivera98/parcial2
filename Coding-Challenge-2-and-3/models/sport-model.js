const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

const sportsSchema = mongoose.Schema({
    id: {
        type : String
    },
    name : {
        type : String
    },
    num_players :{
        type : Number
    }
});

const sportsCollection = mongoose.model('sports', sportsSchema);

const Sports = { 
    postSport : function (sport){
        return sportsCollection
            .create(sport)
            .then(newSport => {
                return newSport;
            })
            .catch(err => {
                throw new Error(err);
            });
    },   
    deleteSport : function(sportId){
        return sportsCollection
            .deleteOne({id : sportId}, function(err) {
                if(err) return handleError(err);
            });
    }   
}
module.exports = { Sports };