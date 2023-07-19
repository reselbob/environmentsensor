import Router from 'router';
import queryString from 'query-string';
import {generate} from "./lib/uuid";

const app = Router({
    mergeParams: true,
});

mimikModule.exports = (context, req, res) => {
    global.context = context;
    app(req, res, (e) => {
        res.end(JSON.stringify({code: e ? 400 : 404, message: e || 'Not Found'}));
    });
};

const deviceData = [];

const getData = () => {
    const values = [];
    context.storage.eachItem((key, value) => {
        values.push(JSON.parse(value));
    });
    return values
}

app.get('/ping', (request, response) => {
    const obj = {ping: `The current date is ${new Date()}`}
    response.end(JSON.stringify(obj, null, 2));
});


app.get('/', (request, response) => {
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

app.post('/', (request, response) => {
    try {
        const val = JSON.parse(request.body);
        //const val = request.body;
        const uuid = generate();
        context.storage.setItem(uuid, JSON.stringify(val));
        response.end(`Value stored successfully with key: ${uuid}.`);
    } catch (error) {
        // Handle the error that occurred during parsing
        response.end(`An error occurred while parsing the JSON: ${error.message}`);
    }
});
