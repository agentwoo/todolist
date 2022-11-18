<!-- 测试数据是否缓存成功 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useTodoList } from '../../store'

const todoListLLL = useTodoList()
console.log(todoListLLL.todoList);


</script>

<template>
    <div></div>
</template>

<style lang='scss' scoped>

</style>