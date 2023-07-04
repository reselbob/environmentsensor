import {Systeminformation} from "systeminformation";
import {DeviceInfo, TempData} from "./deviceInfo";
import { URL } from 'url';
import {Dispatcher} from "./dispatcher";

const GET_TEMP_INTERVAL_MILLISECONDS = process.env.GET_TEMP_INTERVAL_MILLISECONDS || "1000";
const REPORT_TO_SERVER_INTERVAL_MILLISECONDS = process.env.REPORT_TO_SERVER_INTERVAL_MILLISECONDS || "5000";
const GET_LAST_SLICE = process.env.GET_LAST_SLICE  || "3";
const TARGET_URL = new URL(process.env.TARGET_URL  || "https://jsonplaceholder.typicode.com/posts");
const data = new Array<TempData>();


async function getDeviceTemperature() {
    setInterval(async () => {
        // Place your logic or tasks here
        const temp = await DeviceInfo.getCPUTemperature()
        data.push(temp);
        console.log(temp);
    }, parseInt(GET_TEMP_INTERVAL_MILLISECONDS));
}

async function dispatchDeviceTemperature() {
    setInterval(async () => {
        const payload = catArray()
        console.log(`Dispatch: ${payload}`);
        await Dispatcher.dispatch({payload, targetUrl: TARGET_URL})
    }, parseInt(REPORT_TO_SERVER_INTERVAL_MILLISECONDS));
}

function catArray(): Array<TempData>{
    const slice = parseInt(GET_LAST_SLICE )
    if(data.length <= slice){
        return data;
    } else{
        return data.slice(slice * -1);
    }
}


getDeviceTemperature()
dispatchDeviceTemperature()
