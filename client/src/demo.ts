let data: number | string;

data = '42';

data = 10;

interface ICar{
    color: string;
    model: string;
    topSpeed?: number;  //Optional property
}

const car1: ICar = {
    color: 'blue',
    model: 'bmw'
};

const car2: ICar = {
    color: 'red',
    model: 'mercedes',
    topSpeed: 100
};

const multiply = (x:number, y:number): number => {
    return x * y;
};

const multiply2 = (x:number, y:number): string => {
    return (x * y).toString();
}