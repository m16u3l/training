import { Person } from "./Person";

export class Student extends Person {
    private note: Number;

    constructor(firstName: string, lastName: string, note: Number) {
        super(firstName, lastName);
        super.age = 20;
        this.note = note;
    }

    /**
     * setAge
     */
    public setAge(newAge: Number): void {
        this.age = newAge;
    }

    /**
     * getNote
     */
    get getNote(): Number {
        return this.note;
    }

    /**
     * setNote
     */
    set setNote(newNote: Number) {
        this.note = newNote;
    }
}
