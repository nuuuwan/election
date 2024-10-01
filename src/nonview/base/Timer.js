import Time from "./Time";

export default class Timer {

    static ERROR_MULT = 2;

    static getLogger(maxDelta, delta) {
        if (delta < maxDelta) {
            return console.debug;
        }

        if (delta < Timer.ERROR_MULT * maxDelta) {
            return console.warn;
        }

        return console.error;
    }

    static async logAsync(name, maxDelta, callable) {
        const ut = Time.now().ut;
        const output = await callable();
        const delta = Time.now().ut - ut;

        const logger = Timer.getLogger(maxDelta, delta)
    
        if (logger ){
            logger(`🕒[${name}] ${delta}ms (goal: ${maxDelta}ms)`);
        }
        return output;
    }
}