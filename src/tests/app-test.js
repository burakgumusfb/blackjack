require('dotenv').config();
const mongoose = require('mongoose');


const AppTest = {
    mongoDbConnect: async () => {
        const mongodbUri = process.env.ENV === 'docker' ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;
        mongoose.connect(mongodbUri, {});
    },

    mongoDbClose: async () => {
        mongoose.disconnect();
    },
};
module.exports = AppTest;
