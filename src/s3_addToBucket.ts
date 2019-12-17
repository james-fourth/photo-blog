// Load the AWS SDK, fs and path modules for Node.js
import AWS from "aws-sdk";
import fs from "fs";
// import path from "path";
// Set the region
AWS.config.update({region: "us-west-1"})

// Create S3 service object
const s3 = new AWS.S3({apiVersion: "2006-03-01"});
// const file = fs.createReadStream(process.argv[3])

// upload(process.argv[2], process.argv[3], file, function(loc) { console.log(loc) })

export default function s3Upload(bucketName: string, fileName: string, fileContent: any, callback: any) {
    s3.upload({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    }, function(err: any, data: { Location: any; }) {
        if (err) {
            console.log(err)
        } else {
            callback(data.Location);
        }
    })
}