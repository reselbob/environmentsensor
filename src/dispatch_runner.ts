import {Systeminformation} from "systeminformation";
import {DeviceInfo, TemperatureData, GeneralData} from "./deviceInfo";
import {URL} from 'url';
import {Dispatcher} from "./dispatcher";
import path from "path" ;

//const dotenv = require('dotenv');

//dotenv.config();
require('dotenv').config({path: path.join(__dirname, '../', '.env')})

const DEVICE_INFO_TYPE = process.env.DEVICE_INFO_TYPE || "GENERAL";
const GET_INFO_INTERVAL_MILLISECONDS = process.env.GET_INFO_INTERVAL_MILLISECONDS || "1000";
const REPORT_TO_SERVER_INTERVAL_MILLISECONDS = process.env.REPORT_TO_SERVER_INTERVAL_MILLISECONDS || "5000";
const GET_LAST_SLICE = process.env.GET_LAST_SLICE || "3";
const TARGET_URL = new URL(process.env.TARGET_URL || "http://localhost:8083");
const tempData = new Array<TemperatureData>();
const genData = new Array<GeneralData>();

async function getDeviceTemperature() {
    setInterval(async () => {
        // Place your logic or tasks here
        const temp = await DeviceInfo.getCPUTemperature()
        tempData.push(temp);
        console.log(temp);
    }, parseInt(GET_INFO_INTERVAL_MILLISECONDS));
}

async function getDeviceInfo() {
    setInterval(async () => {
        // Place your logic or tasks here
        const temp = await DeviceInfo.getGeneralInfo()
        genData.push(temp);
        console.log(temp);
    }, parseInt(GET_INFO_INTERVAL_MILLISECONDS));
}

async function dispatchDeviceTemperature() {
    setInterval(async () => {
        const payload = catArray(tempData)
        console.log(`Dispatch: ${payload}`);
        await Dispatcher.dispatch({payload, targetUrl: TARGET_URL})
    }, parseInt(REPORT_TO_SERVER_INTERVAL_MILLISECONDS));
}

async function dispatchDeviceInfo() {
    setInterval(async () => {
        const payload = catArray(genData)
        console.log(`Dispatch: ${payload}`);
        await Dispatcher.dispatch({payload, targetUrl: TARGET_URL})
    }, parseInt(REPORT_TO_SERVER_INTERVAL_MILLISECONDS));
}

function catArray<T>(arr: Array<T>): Array<T> {
    const slice = parseInt(GET_LAST_SLICE)
    if (arr.length <= slice) {
        return arr;
    } else {
        return arr.slice(slice * -1);
    }
}


switch (DEVICE_INFO_TYPE.toUpperCase()) {
    case "GENERAL":
        getDeviceInfo();
        dispatchDeviceInfo();
        break;
    case "TEMPERATURE":
        getDeviceTemperature();
        dispatchDeviceTemperature();
        break;
};
