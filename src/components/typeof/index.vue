<!-- restart -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

// typeof 是操作符而不是对象，可以使用圆括号，但不是必要的
let a: string = '123';
console.log('a', typeof a);
console.log('a', typeof (a));

console.log('null', typeof (null));//object


let b = undefined;
console.log('b', typeof b);
console.log(typeof undefined);

//区分函数和其他对象
console.log('{}', typeof {});//object
console.log('[]', typeof []);//object
console.log('function', typeof function () { });//function

// undefined值是派生自null值的
console.log('null', null == undefined);//true



</script>

<template>
    <div>

    </div>
</template>

<style lang='scss' scoped>

</style>