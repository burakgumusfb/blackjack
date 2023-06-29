
import express from "express";

var app = express();

app.get('/',function (req,res,next) {
    res.json('hi');
});
