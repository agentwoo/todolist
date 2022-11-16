<!-- ts-review -->
<script lang='ts' setup>
import { Male } from '@element-plus/icons-vue';
import { reactive, toRefs, ref } from 'vue'

// 访问联合类型的属性或方法、只能访问其共有的属性
function A(sth: string | number): number {
    return Number(sth.toString())
}
// console.log("A", A('ads'));


let numberOrString: number | string;
numberOrString = 'asd';
// console.log('String.length', numberOrString.length);

numberOrString = 666;
// 提示错误，number上没有length
// console.log('number.length', numberOrString.length);




// 任意属性
interface IAnimal {
    // 不能有可选属性，否则会报错
    // age?: number,
    hobbits: string,
    name: string,
    // 任意属性的值为string类型，且确定属性的类型是任意属性类型的子集
    [propName: string]: string
}

let mouse: IAnimal = {
    hobbits: '烫头',
    name: 'tom',
    // 添加可选属性
    gender: 'male'
}
// console.log("mouse", mouse);


interface IPerson {
    name: string,
    age: number,
    // 可选属性
    [propName: string]: string | number
}

let jack: IPerson = {
    name: 'jack',
    age: 18,
    // 添加多个属性
    chid: 18,
    hobbits: '唱、跳、rap'
}
// console.log("jack", jack);



// 只读属性
interface IStudents {
    readonly stuId: number,
    name: string,
    age: number,
    [propName: string]: string | number
}

let student: IStudents = {
    stuId: 10086,
    name: '张三',
    age: 18,
    hobbits: '抽烟、喝酒、烫头'
}

// console.log('student', student);

// student.stuId = 1111// 修改stuId会提示错误，但仍可执行
student.name = '李四'
// console.log('readOnlyStudent', student);



// 数组的定义方式--常用
let arr: number[] = []
let arr2: Array<number> = []
let arr3 = [] as number[]

// console.log(Array.isArray(arr), Array.isArray(arr2), Array.isArray(arr3));

// 用接口表示数组
interface IArray {
    [index: number]: number;
}
let arr4: IArray = [1, 2, 3]
// console.log(Array.isArray(arr4));//true
// console.log('arr4', arr4);

// arr4.push(4)//错误提示，不存在push属性，但仍可执行
// console.log(arr4);



// 函数的类型,定义函数时，需要确定输入、输出的类型

// ts自动推导出FnA的类型
const FnA = (a: number, b: number): number => {
    return a - b
}
// 手动给FnB添加类型
const FnB: (a: number, b: number) => number = (a: number, b: number): number => {
    return a + b
}

// 接口定义函数类型
interface IFnC {
    (a: number, b: number): number
}
const FnC: IFnC = (a: number, b: number): number => {
    return a + b
}
// console.log(FnC(1, 4));

// 可选参数--注意此时可选参数位置只能在必选参数后，否则会报错
const FnD = (a: number, b?: number): number => {
    if (b) {
        return a + b
    } else {
        return a
    }
}
// console.log(FnD(2));


// 函数添加默认值
const FnE = (a = 5, b: number): number => {
    return a - b
}
//此时使用函数第一个参数默认值时，可传入undefined进行占位
// console.log(FnE(undefined, 3));
// console.log(FnE(1, 2));

const FnF = (a: number, b: number = 5): number => {
    return a - b
}
// console.log(FnF(2));//-3



// 剩余参数...rest
const FnG = (a: number[], ...items: number[]) => {
    items.forEach(function (item: number) {
        a.push(item)
    })
}
let a: number[] = [1, 2];
FnG(a, 1, 2, 3, 4, 5)
// console.log(a);//[1, 2, 1, 2, 3, 4, 5]



// 函数重载--此时只能用函数声明定义函数--使用函数表达式会报错--标识符重复
// 调用函数时，传入的参数时什么类型，返回值就是什么类型
function FnH(a: number): number;
function FnH(a: string): string;
function FnH(a: number | string): number | string | void {
    if (typeof a === 'number') {
        // return Number(String(a).split('').reverse().join(''))
        return Number(a.toString().split('').reverse().join(''))
    }
    if (typeof a === 'string') {
        return a.split('').reverse().join('')
    }
}
// console.log(FnH(123), typeof FnH(123));
// console.log(FnH('123'), typeof FnH('123'));
// console.log(FnH('hello'));


// const FnH = (a: number | string): number | string | void => {
//     if (typeof a === 'number') {
//         // return Number(String(a).split('').reverse().join(''))
//         return Number(a.toString().split('').reverse().join(''))
//     }
//     if (typeof a === 'string') {
//         return a.split('').reverse().join('')
//     }
// }



// 断言
// 将父类型断言为更加具体的子类
class ApiError extends Error {
    code: number = 0
}
class HttpError extends Error {
    statusCode: number = 0
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true
    }
    return false
}

// 此处用instanceof更合适--因为ApiError是js的类
function isApiError2(error: Error) {
    if (error instanceof ApiError) {
        return true
    }
    return false
}

// 类型断言vs类型转换
// 类型断言只会影响到ts编译时的类型，不会真影响到变量的类型--类型转换需要调用类型转换的方法
function AsA(sth: any): boolean {
    return sth as boolean
}
// console.log('AsA', AsA(1));//返回值为1

function AsB(sth: any): boolean {
    return Boolean(sth)
}
// console.log('AsB', AsB(1));//返回值为true








</script>

<template>
    <div>
        123
    </div>
</template>

<style lang='scss' scoped>

</style>