function printLabel (labelledObj) {
    console.log(labelledObj.label);
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


export default class Clock extends AllClock {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {
        super();
        //

        console.log("from util.ts");
    }
}