"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.get("/new-post", function (req, res) {
    res.render("new-post");
});
app.listen(3000, function () {
    console.log("Server is listening on 3000");
});
