import express = require('express');

const app: express.Application() = express();

app.get("/", function(req: any, res: any) {
    res.send("Hello World!");
});

app.listen(3000, function():void {
    console.log("Server is listening on 3000")
})