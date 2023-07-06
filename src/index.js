import Router from 'router';
import queryString from 'query-string';
import Q from 'q';
import { env } from './helper';

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

// Sample HTTP Request
app.get('/', (req, res) => {
    console.log(`Starting GET for DeviceData`);
    res.end(JSON.stringify(deviceData));
});




// Sample HTTP request with JSON Body and return it
app.post('/', (req, res) => {
    validateDeviceData(req.body))
    res.end(req.body);
});

const validateDeviceData(data){
    return data;
}
