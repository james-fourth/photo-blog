"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
// import request from 'request';
// import ejs from 'ejs';
var multer_1 = __importDefault(require("multer"));
// import lodash from 'lodash';
var mongoose_1 = __importDefault(require("mongoose"));
var s3_addToBucket_1 = __importDefault(require("./s3_addToBucket"));
var app = express_1.default();
var upload = multer_1.default({ dest: "storage/" });
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
mongoose_1.default.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });
var postSchema = new mongoose_1.default.Schema({
    title: String,
    content: String,
    imageLocation: String,
    timestamp: String
});
var Post = mongoose_1.default.model("Post", postSchema);
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/new-post", function (req, res) {
    res.render("new-post");
});
app.post("/new-post", upload.single('image'), function (req, res) {
    // console.log(req.file.path);
    var title = req.body.title;
    var textCon = req.body.content;
    var imageLoc = req.file.path;
    var imageCon = fs_1.default.createReadStream(req.file.path);
    function blogPost(imageLocation) {
        var post = new Post({
            title: title,
            content: textCon,
            imageLocation: imageLocation,
            timestamp: new Date().toISOString(),
        });
        post.save();
    }
    s3_addToBucket_1.default("daytuhbuckit", imageLoc, imageCon, blogPost);
    res.redirect("/");
});
app.listen(3000, function () {
    console.log("Server is listening on 3000");
});
