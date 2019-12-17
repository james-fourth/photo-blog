"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load the AWS SDK, fs and path modules for Node.js
var aws_sdk_1 = __importDefault(require("aws-sdk"));
// import path from "path";
// Set the region
aws_sdk_1.default.config.update({ region: "us-west-1" });
// Create S3 service object
var s3 = new aws_sdk_1.default.S3({ apiVersion: "2006-03-01" });
// const file = fs.createReadStream(process.argv[3])
// upload(process.argv[2], process.argv[3], file, function(loc) { console.log(loc) })
function s3Upload(bucketName, fileName, fileContent, callback) {
    s3.upload({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            callback(data.Location);
        }
    });
}
exports.default = s3Upload;
