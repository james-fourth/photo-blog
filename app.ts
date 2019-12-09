import express = require('express');
import request = require('request');
import ejs = require('ejs');
import multer = require('multer');
import lodash = require('lodash');
import monogoose = require('mongoose');

const app: express.Application = express();

app.set("view engine", "ejs");

app.get("/", function(req: any, res: any) {
    res.render("index");
});

app.listen(3000, function():void {
    console.log("Server is listening on 3000")
})