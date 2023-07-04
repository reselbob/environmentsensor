import path from "path" ;
import express from "express";
import {logger} from "../src/logger"
const app = express();



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 8083;

app.post("/", (req: any, res: any,) => {
    // Get the JSON data from the request body
    const data = req.body;

    // Do something with the data
    console.log(JSON.stringify(data));

    // Send a response back to the client
    res.send("OK");
});


const server = app.listen(port, () => {
    logger.info(`Mock server is running on port ${port} at ${new Date()}`);
});

const shutdown = async () => {
    server.close()
}

module.exports = {server, shutdown};
