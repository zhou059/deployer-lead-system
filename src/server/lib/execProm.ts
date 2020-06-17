/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from 'child_process';
import stripColor from 'strip-color';
import * as util from 'util';

const execProm = util.promisify(exec);
const maxBuffer = 1024 * 3000;

// tslint:disable-next-line: no-any
const exec2JSON = async (cmd: string, options = { maxBuffer }): Promise<any> => {
    try {
        const results = await execProm(cmd, options);
        return JSON.parse(stripColor(results.stdout));
    } catch (err) {
        console.log(err);
        return JSON.parse(stripColor(err.stdout));
    }
};

// tslint:disable-next-line: no-any
const exec2String = async (cmd: string, options = { maxBuffer }): Promise<any> => {
    try {
        const results = await execProm(cmd, options);
        return results.stdout;
    } catch (err) {
        // console.log(err);
        return err.stdout;
    }
};

export { execProm, exec2JSON, exec2String };
export { execProm as exec };
