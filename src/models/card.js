const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        value: { type: Number, required: true },
        name: {
            type: String, required: true
        },
        deck:{type:Number,required:true},
        type:{type:String,required:true},
        isAce:{type:Boolean}
    },
);
schema.index({ name: 1, decks: 1,type:1 }, { unique: true })

const Card = mongoose.model('cards', schema, 'cards');




module.exports = Card;
