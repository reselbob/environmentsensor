import {cpuTemperature, get, Systeminformation} from "systeminformation";

/**
 * This class encapsulates the behavior for gathering
 * information about the physical environment of the machine
 * on which the program is running.
 */
export class DeviceInfo {
    /**
     * Returns CPU temperature as a promise.
     */
    static async getCPUTemperature(): Promise<TemperatureData> {
        const temp: Systeminformation.CpuTemperatureData = await cpuTemperature();
        return {
            data: temp, timeStamp: new Date()
        };
    };

    /**
     * Returns information about the machine's CPU,
     * the platform and release version of the operating system
     * and model and manufacturer of the machine's hardware or
     * virtualized hardware. Information is returned as a promise.
     */
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
