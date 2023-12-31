import path from "path" ;
import express from "express";
import {logger} from "../src/logger"
const app = express();

/**
 * This is a HTTP server that can be used for testing the
 * code in the dispatch_runner.ts file. The server is an emulation
 * of the edgeEngine microservice. However, the mock server does not
 * provide the serverless functionality the is implemented in
 * the deviceinformation microservice. Thus, there is no support for
 * the edgeEngine context object or internal storage.
 */

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 8083;

app.post("/info", (req: any, res: any,) => {
    // Get the JSON data from the request body
    const data = req.body;

    const jsonString = JSON.stringify(data, null, 2);
    console.log(jsonString);

    // Send a response back to the client
    res.send("OK");
});


const server = app.listen(port, () => {
    const startup = {status: "RUNNING", message:`Mock server is running on port ${port} at ${new Date()}` }
    logger.info(JSON.stringify(startup));
});

const shutdown = async () => {
    server.close()
}

module.exports = {server, shutdown};
