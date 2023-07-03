import {DeviceInfo} from "./deviceInfo";

const world = 'world';

export function hello(who: string = world): string {
    return `Hello ${who}! `;
}


console.log(DeviceInfo.getCPUTemperature());
