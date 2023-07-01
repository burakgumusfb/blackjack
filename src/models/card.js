const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        value: { type: [Number], required: true },
        name: {
            type: String, required: true
        },
        deck:{type:Number,required:true},
        type:{type:String,required:true},
        isAce:{type:Boolean},
        isUsed:{type:Boolean,default:false}
    },
);

const Card = mongoose.model('cards', schema, 'cards');




module.exports = {
    Card:Card,
    Cardschema:schema    
};
