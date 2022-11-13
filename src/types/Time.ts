export class ScheduleTime {
    private _value: number;

    constructor(timeString: string){
        let ts = timeString;
        if (ts.length === 1) {
            ts = ts.padStart(2, '0');
        } else if (ts.length === 3) {
            ts = ts.padStart(4, '0');
        }
        ts = ts.padEnd(4, '0')
        this._value = (parseInt(ts.slice(0, 2))*60) + (parseInt(ts.slice(2,4)));
    }
    toString() {
        return `${(this._value/60-0.5).toFixed(0).padStart(2, '0')}${(this._value%60).toFixed(0).padEnd(2, '0')}`;
    }
}