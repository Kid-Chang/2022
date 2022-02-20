// union type
let names: string = "kim";

let name_array: string[] = ["kim", "HI"];

type myType = string | number;

let myName: myType = "Chang";
let myAge: myType = 123;

// func
function func(x: number): number {
    return x * 2;
}
// 함수의 리턴값을 지정할때는 ()와 {} 에 설정.

// array에 사용하는 tuple 타입.
type Member = [number, boolean];
let john: Member = [123, false];

type Members = {
    name: string;
};
let kim: Members = { name: "kim" };

// 각 key에 따른 타입지정.
type Memberss = {
    [key: string]: string;
};
let kerry: Memberss = { name: "kim", age: "123" };

// class 타입지정
class User {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
