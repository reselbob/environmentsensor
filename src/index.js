import Router from 'router';
import queryString from 'query-string';
import {generate} from "./lib/uuid";

/**
 * This file contains the code for the edgeEngine
 * deviceinformation microservice. This code accommodates
 * HTTP calls in a serverless manner.
 *
 * Each time an HTTP call is made to this edgeEngine microservice,
 * the edgeEngine runtime spins up new instance of the microservice
 * and accept the HTTP method call accordingly. As a result, no state is
 * maintained by the microservice between HTTP calls. Rather, state information
 * is stored within the internal storage mechanism provide by the
 * edgeEngine runtime.
 */

const app = Router({
    mergeParams: true,
});

mimikModule.exports = (context, req, res) => {
    global.context = context;
    app(req, res, (e) => {
        res.end(JSON.stringify({code: e ? 400 : 404, message: e || 'Not Found'}));
    });
};

/**
 * Retrieves device information from the internal storage
 * provided by the edgeEngine runtime. The internal storage is
 * accessed though the global context object. The  context object
 * is provided by the edgeEngine runtime.
 * @returns {*[]}
 */
const getData = () => {
    const values = [];
    context.storage.eachItem((key, value) => {
        values.push(JSON.parse(value));
    });
    return values
}

/**
 * This endpoint represents provides "ping" functionality
 * which can be used to determine that the microservice is
 * accessible.
 */
app.get('/ping', (request, response) => {
    const obj = {ping: `The current date is ${new Date()}`}
    response.end(JSON.stringify(obj, null, 2));
});

/**
 * This endpoint returns device information stored in
 * internal storage as a JSON array. The endpoint support a querystring parameter
 * named, count which will return that last elements the JSON array
 * according to the value assigned to the querystring parameter count.
 */
app.get('/info', (request, response) => {
    const query = queryString.parse(request._parsedUrl.query);

    if (query && query.count) {
        const cnt = Number(query.count); // Assume 'count' is expected to be a number
        if (isNaN(cnt)) {
            // Invalid data type: 'age' is not a number
            return response.status(400).json({error: 'Invalid data type for query string parameter: count'});
        }
        const elements = getData().slice(cnt * -1)
        response.end(JSON.stringify(elements, null, 2));
    } else {
        response.end(JSON.stringify(getData(), null, 2))
    }
});
/**
 * The endpoint accepts device information sent to the microservice. The data
 * must be submitted as valid JSON otherwise the endpoint will report an
 * error.
 */
app.post('/info', (request, response) => {
    try {
        const val = JSON.parse(request.body);
        const uuid = generate();
        context.storage.setItem(uuid, JSON.stringify(val));
        response.end(`Value stored successfully with key: ${uuid}.`);
    } catch (error) {
        // Handle the error that occurred during parsing
        response.end(`An error occurred while parsing the JSON: ${error.message}`);
    }
});
