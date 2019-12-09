"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("index");
});
app.listen(3000, function () {
    console.log("Server is listening on 3000");
});
