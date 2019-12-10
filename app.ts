import express = require('express');
import request = require('request');
import ejs = require('ejs');
import multer = require('multer');
import lodash = require('lodash');
import monogoose = require('mongoose');

const app: express.Application = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/new-post", function(req: any, res: any) {
    res.render("new-post");
});

app.post("/new-post", function(req: any, res: any) {
    
})

app.listen(3000, function():void {
    console.log("Server is listening on 3000")
})