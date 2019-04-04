import { Person } from "./Person";
import { Student } from "./Student";
import { Grid } from './Grid';

const person = new Person("firstName", "lastName");
const student = new Student("Miguel", "condori", 100);

console.log(person)
student.setNote = 80
console.log(student.getNote)


let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
