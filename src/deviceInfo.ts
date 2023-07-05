import {cpuTemperature, get, Systeminformation} from "systeminformation";
export class DeviceInfo {
    static async getCPUTemperature(): Promise<TemperatureData> {
        const temp: Systeminformation.CpuTemperatureData = await cpuTemperature();
        return {
            data: temp, timeStamp: new Date()
        };
    };

    static async getGeneralInfo(): Promise<any>{
        const valueObject = {
            cpu: '*',
            osInfo: 'platform, release',
            system: 'model, manufacturer'
        }
        return await get(valueObject);
    }

}

export interface TemperatureData {
    data: Systeminformation.CpuTemperatureData,
    timeStamp: Date;
}

export interface GeneralData {
    data: any,
    timeStamp: Date;
}
