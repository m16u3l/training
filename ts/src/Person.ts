import { Some } from "./Some";

export class Person implements Some {
    readonly fullName: string;
    protected age: Number;

    constructor(fistName: string, lastName: string) {

        this.fullName = `${fistName} ${lastName}`;
        this.age = 25;
    }
}
