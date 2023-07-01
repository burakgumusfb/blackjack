require('dotenv').config();
const mongoose = require('mongoose');


exports.mongoDbConnect = async () => {
    console.log(process.env.PROJECT_ENV);
    const mongodbUri = process.env.PROJECT_ENV === 'docker' ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;
    mongoose.connect(mongodbUri, {});
};
exports.mongoDbClose = async () => {
        mongoose.disconnect();
};

