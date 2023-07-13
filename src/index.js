import Router from 'router';
import queryString from 'query-string';
import Q from 'q';
import { env } from './helper';
import { v4 as uuidv4 } from 'uuid';

const app = Router({
    mergeParams: true,
});

mimikModule.exports = (context, req, res) => {
    global.context = context;
    app(req, res, (e) => {
        res.end(JSON.stringify({ code: e ? 400 : 404, message: e || 'Not Found' }));
    });
};

const deviceData = [];

const getData = () => {
    const values = [];
    context.storage.eachItem((key, value) => {
        values.push(value);
    });
    return values
}

app.get('/:count', (request, response) => {
    const cnt = req.params.count;
    // TODO make sure the value of count is an integer
    const elements = getData().slice(cnt * -1)
    response.end(JSON.stringify(elements, NULL, 2));
});


app.get('/', (request, response) => {
    response.end(JSON.stringify(getData(), null, 2))
});

app.post('/', (request, response) => {
    const { val } = JSON.parse(request.body);
    const uuid = uuidv4();
    context.storage.setItem(uuid, val);
    response.end(`Value stored successfully with key: ${uuid}.`);
});
