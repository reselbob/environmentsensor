import {cpuTemperature, get, Systeminformation} from "systeminformation";
export class DeviceInfo {
    static async getCPUTemperature(): Promise<TempData> {
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

export interface TempData {
    data: Systeminformation.CpuTemperatureData,
    timeStamp: Date;
}
