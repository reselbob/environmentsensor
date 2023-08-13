import {DeviceInfo, TemperatureData, GeneralData} from "./deviceInfo";
import {URL} from 'url';
import {Dispatcher} from "./dispatcher";
import path from "path" ;

require('dotenv').config({path: path.join(__dirname, '../', '.env')})

const DEVICE_INFO_TYPE = process.env.DEVICE_INFO_TYPE || "GENERAL";
const GET_INFO_INTERVAL_MILLISECONDS = process.env.GET_INFO_INTERVAL_MILLISECONDS || "1000";
const REPORT_TO_SERVER_INTERVAL_MILLISECONDS = process.env.REPORT_TO_SERVER_INTERVAL_MILLISECONDS || "5000";
const GET_LAST_SLICE = process.env.GET_LAST_SLICE || "3";
const TARGET_URL = new URL(process.env.TARGET_URL || "http://localhost:8083/info");
const tempData = new Array<TemperatureData>();
const genData = new Array<GeneralData>();

/**
 * The purpose of this function is to get CPU temperature
 * information about the host machine. BE ADVISED: This
 * function will return CPU temperature when the program is
 * Dispatcher is run directly on a physical machine. This
 * program will not return temperature information when run on
 * a host that is a virtual machine.
 */
async function getDeviceTemperature() {
    setInterval(async () => {
        // Place your logic or tasks here
        const temp = await DeviceInfo.getCPUTemperature()
        tempData.push(temp);
        console.log(temp);
    }, parseInt(GET_INFO_INTERVAL_MILLISECONDS));
}

/**
 * The purpose of this function is to the general
 * information about the physical environment of the
 * host machine.
 */
async function getDeviceInfo() {
    setInterval(async () => {
        // Place your logic or tasks here
        const info = await DeviceInfo.getGeneralInfo()
        genData.push(info);
        console.log(info);
    }, parseInt(GET_INFO_INTERVAL_MILLISECONDS));
}

/**
 * The purpose of the function is to send CPU
 * temperature to an external service defined by
 * the value assigned to the variable TARGET_URL.
 */
async function dispatchDeviceTemperature() {
    setInterval(async () => {
        const payload = catArray(tempData)
        console.log(`Dispatch: ${payload}`);
        await Dispatcher.dispatch({payload, targetUrl: TARGET_URL})
    }, parseInt(REPORT_TO_SERVER_INTERVAL_MILLISECONDS));
}

/**
 * The purpose of the function is to send general information
 * about the host computer to an external service defined by
 * the value assigned to the variable TARGET_URL.
 */
async function dispatchDeviceInfo() {
    setInterval(async () => {
        const payload = catArray(genData)
        //console.log(`Dispatch: ${payload}`);
        console.log(`TARGET_URL: ${TARGET_URL}`);
        await Dispatcher.dispatch({payload, targetUrl: TARGET_URL})
    }, parseInt(REPORT_TO_SERVER_INTERVAL_MILLISECONDS));
}

/**
 * Utility function to extract elements from an array
 * @param arr, the array from which elements will be
 * extracted.
 */
function catArray<T>(arr: Array<T>): Array<T> {
    const slice = parseInt(GET_LAST_SLICE)
    if (arr.length <= slice) {
        return arr;
    } else {
        return arr.slice(slice * -1);
    }
}

/**
 * The purpose of this switch statement is to determine
 * the information to be sent to the external service and also
 * send that information.
 */
switch (DEVICE_INFO_TYPE.toUpperCase()) {
    case "GENERAL":
        getDeviceInfo();
        dispatchDeviceInfo();
        break;
    case "TEMPERATURE":
        getDeviceTemperature();
        dispatchDeviceTemperature();
        break;
    case "ALL":
        getDeviceInfo();
        dispatchDeviceInfo();
        getDeviceTemperature();
        dispatchDeviceTemperature();
};
