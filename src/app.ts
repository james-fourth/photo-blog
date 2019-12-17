import express from 'express';
import fs from 'fs';
// import request from 'request';
// import ejs from 'ejs';
import multer from 'multer';
import bodyParser from 'body-parser';
// import lodash from 'lodash';
import mongoose from 'mongoose';
import path from 'path'
import s3Upload from './s3_addToBucket';

const app = express();
const upload = multer({dest: "storage/"});

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true})

const postSchema = new mongoose.Schema({
title: String,
content: String,
imageLocation: String,
timestamp: String
})

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req: any, res: any) {
    
    res.render("index");
})

app.get("/new-post", function(req: any, res: any) {
    res.render("new-post");
});

app.post("/new-post", upload.single('image'),function(req: any, res: any) {
    // console.log(req.file.path);
    const title: string = req.body.title;
    const textCon: string = req.body.content;
    const imageLoc: string = req.file.path
    const imageCon: any = fs.createReadStream(req.file.path);

    function blogPost(imageLocation: string) {
        const post: any = new Post({
        title: title,
        content: textCon,
        imageLocation: imageLocation,
        timestamp: new Date().toISOString(),
        });

        post.save();
    }

    s3Upload("daytuhbuckit", imageLoc, imageCon, blogPost);
    res.redirect("/");
})

app.listen(3000, function():void {
    console.log("Server is listening on 3000")
})