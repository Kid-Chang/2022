"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);
var blockchain = [genesisBlock];
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimestamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");
console.log(blockchain);
// const name = "nico",
//     age = 24,
//     gender = "male";
// 인터페이스는 js에서 볼수 없고, class는 js에서 볼수 있음.
// interface Human {
//     name: string;
//     age: number;
//     gender: string;
// }
// class Human {
//     public name: string;
//     public age: number;
//     public gender: string;
//     // public or private는 js에서 표시되지 않음. 없거든.
//     constructor(name: string, age: number, gender?: string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//     }
// }
// const lynn = new Human("lynn", 20, "female");
// const person = {
//     name: "nico",
//     gender: "male",
//     age: 22,
// };
// // const sayHi = (name: string, age: number, gender?: string): string => {
// //     return `hello ${name}, ${age}, ${gender}`;
// // };
// const sayHi = (person: Human): string => {
//     return `hello ${person.name}, ${person.age}, ${person.gender}`;
// };
// console.log(sayHi(person));
// console.log(sayHi(lynn));
// export {};
// export {} 를 이용해서 타입스크립트 문제 해제.
//# sourceMappingURL=index.js.map