import {expect} from "chai";
import {describe} from "mocha";
import {DeviceInfo} from "../src/deviceInfo";

describe('DeviceInfo Tests', () => {
    it('getCPUTemperature Test', async () => {
        const result = await DeviceInfo.getCPUTemperature();
        expect(result).to.be.an('object');
        console.log(JSON.stringify(result));
    });

    it('generalInfo Test', async () => {
        const result = await DeviceInfo.getGeneralInfo()
        expect(result).to.be.an('object');
        console.log(JSON.stringify(result));
    });
});
