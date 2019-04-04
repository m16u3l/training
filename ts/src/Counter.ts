interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
        console.log("start: ", start)
     };
    counter.interval = 123;
    counter.reset = function () {
        this.interval=0;
     };
    return counter;
}

let c = getCounter();
console.log(c)
c(10);
console.log(c)
c.reset();
console.log(c)
c.interval = 5.0;
console.log(c)
