const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        value: { type: Number, required: true },
        name: {
            type: String, required: true
        },
        decks:{type:Number,required:true}
    },
);
schema.index({ name: 1, decks: 1 }, { unique: true })

const Card = mongoose.model('Cards', schema, 'Cards');




module.exports = Card;
