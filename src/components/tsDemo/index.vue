<!-- tsDemo -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { stringifyQuery } from 'vue-router';

//接口定义函数形状
interface add {
    (a: number | string, b: number | string): string;
}

let Add: add;

Add = function (a: number | string, b: number | string): string {
    return String(a) + String(b);
}

console.log('add', Add(1, 2));
console.log('add', Add('12', '13'));


//传入值可以是字符串或数字，返回数字
function Sub(a: number | string, b: number | string): number {
    let c = Number(a) - Number(b)
    return isNaN(c) ? -1 : c;
}
console.log('Sub', Sub('true', '12'));
console.log('Sub', Sub('123', '12'));
console.log('Sub', Sub(12, 10));

// const arr1: number[] = []
// const arr2: Array<number> = []
// const arr3 = [] as number[]


function a(b = 1) {
    const arr = [] as number[]
    for (let i = 1; i <= 20; i++) {
        arr.push(i * b)
    }
    return arr
}

let A = a()
let newList: number[] = []

for (let i of A) {
    i = i * 10
    newList.push(i)
}

let mapRes = a().map(function (item, index, array) {
    return item * 10
})

function MyMap(b = 1) {
    return a().map((item, index, array) => item * b)
}

let filterRes = a().filter(function (item, index, array) {
    return item % 2 == 0 ? item : ''
})


let b = [] as number[]
a().forEach(function (item, index, array) {
    b.push(item * 10)
})

console.log('b', b);

//判断对象是否为数组
console.log(Array.isArray(b));

//返回原数组
console.log('valueOf', b.valueOf());

//返回字符串
console.log('tostring', b.toString());

//返回数组的长度
console.log('push', b.push(1111), b);

//删除数组的最后一项，返回删除的数据
console.log('pop', b.pop(), b);

//concat将两个数组连接在一起
let c: Array<string> = ['hello']
let d: string[] = ['world']
console.log(c.concat(d));

//reverse将数组颠倒
console.log('reverse', b.reverse());

//slice返回新数组，原数组不变---参数为左闭右开
console.log('slice', b.slice(0, 5));

//map返回新数组
console.log('map', b.map((item) => item / 2));


//分页
function MySlice() {
    let newList: number[][] = [];
    let arr = a();
    for (let i = 0; i < arr.length; i += 10) {
        let List = arr.slice(i, i + 10);
        newList.push(List);
    }
    return newList
}

console.log('MySlice', MySlice());




interface todoListItem {
    text: string,
    finished: boolean
}

// 添加num===>{text:string,finished:boolean,num:number}
type TA = {
    num: number
} & todoListItem

const aa: TA = {
    text: '132',
    finished: true,
    num: 123
}
// console.log(aa);

//去除finished===>{text:string,num:number}
type TB = {
    num: number
} & Omit<todoListItem, 'finished'>

const bb: TB = {
    num: 0,
    text: '123'
}
console.log('bb', bb);




</script>

<template>
    <div></div>
</template>

<style lang='scss' scoped>

</style>