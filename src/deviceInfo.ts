import {cpuTemperature, get, Systeminformation} from "systeminformation";
export class DeviceInfo {
    static async getCPUTemperature(): Promise<Systeminformation.CpuTemperatureData>{
        const temp = await cpuTemperature();
        return temp;
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
