let testNumber: Number | String;

// let testString: String;
import * as Interface from '../libs/Interface'
// import Interface = require('../libs/Interface');

function printLabel (labelledObj: Interface.LabelledValue) {
    console.log(labelledObj.label);
}

let mySearch: Interface.SearchFunc;
mySearch = function(source, subSting) {
    let result = source.search(subSting);
    return result > -1;
}

let myObj = { size: 10, label: "Size 10 Object"};

printLabel(myObj);
// printLabel(myObj as LabelledValue);

class AllClock {
    originClock: 1960;
    private privateNumber: 555;
    protected proNumber: 666;
    constructor(){
        console.log(this.privateNumber);
        console.log(this.proNumber)
    }
    useHandler(){
        console.log(this.privateNumber)
    }
}


export default class Clock extends AllClock implements Interface.ClockInterface  {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {
        super();
        //

        console.log();
    }
}

// let numberClock = new Clock(4,3);
