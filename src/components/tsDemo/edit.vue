<!-- 增删改查 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
// interface IList {
//     id: number;
//     name: string;
// }

//原始列表
let list = [
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
    { id: 3, name: 'wangwu' },
    { id: 4, name: 'lisi' }
]

//获取数组对象的类型
type listItem = typeof list[0]

//增加用户
function add(obj: listItem) {
    let index = list.findIndex(v => v.id === obj.id)
    index === -1 ? list.push(obj) : alert('该用户已存在')
    // console.log('NewObj', NewObj);
    return list
}

// console.log('add', add({ id: 5, name: 'test' }));


//删除用户
function del(obj: listItem) {
    let index = list.findIndex(v => v.id === obj.id)
    index === -1 ? alert('该用户不存在') : list.splice(index, 1)
    return list
}

// console.log('del', del({ id: 2, name: 'lisi' }));


//更改用户信息
function updata(obj: listItem) {
    let index = list.findIndex(v => v.id === obj.id)
    index === -1 ? alert('该用户不存在') : list.splice(index, 1, obj), alert('修改成功')
    return list
}

// console.log('updata', updata({ id: 2, name: 'jack' }));


//获取用户信息
function select(obj: listItem) {
    //用name查询，返回结果中id以list为准
    // let newList = list.filter(v => v.name.indexOf(obj.name) != -1)
    // return newList.length === 0 ? alert('没有该用户') : newList

    //用id查询，返回结果中name的值以list为准
    // let newList = list.find(v => v.id == obj.id)
    // return newList === undefined ? alert('没有该用户') : newList


    //同时用id和name查找
    let newList = list
    if (obj.id) {
        newList = list.filter(v => v.id === obj.id)
    }
    if (obj.name) {
        newList = (obj.id ? newList : list).filter(v => v.name.indexOf(obj.name) != -1)
        newList.length === 0 ? alert('该用户不存在') : newList
    }
    return newList
}

console.log('list', select({ id: 2, name: 'lisi' }));

</script>

<template>
    <div></div>
</template>

<style lang='scss' scoped>

</style>