
// export module Interface {
    export interface LabelledValue {
        label: string;
        size: number;
        color?: string;
        date?: string;
        [key: string]: any;
    }

    export interface SearchFunc {
        (source: string, subSting: string): boolean;
    }
    export interface ClockInterface {
        currentTime: Date;
        oldTime?: Date;
        [key: string]: any;
        setTime(d: Date);
    }

    export module TestInterface  {

    }
// }


// enum Direction {
//     Up = "UP",
//     Down = "DOWN",
//     Left = "LEFT",
//     Right = "RIGHT",
// }
