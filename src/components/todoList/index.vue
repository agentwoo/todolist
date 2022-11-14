<!-- todoList-Demo--手写 -->
<script lang='ts' setup>
import { reactive } from 'vue'
import { Edit, Delete, Plus, DocumentChecked } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface TodoItem {
    id: number,
    text: string,
    finished: boolean
}

const data = reactive({
    inputVal: '',
    // checked: false,
    todoList: [] as TodoItem[]
})

let id = 0

//增加待办事项
const addItem = () => {
    const inputVal = data.inputVal.trim()
    data.todoList.push({
        id: id++,
        text: inputVal,
        finished: false
    })

    //完成添加操作后，清空输入框
    data.inputVal = '';
    ElMessage({
        message: '添加成功',
        type: 'success'
    })
}

//删除待办事项
const onDeleteItem = (item: TodoItem) => {
    let index = data.todoList.findIndex(v => v.id === item.id)
    // data.todoList.splice(index, 1)
    ElMessageBox.confirm(
        '是否删除',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            data.todoList.splice(index, 1)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

// 修改当前待办事项
const onEditItem = (item: TodoItem) => {
    let index = data.todoList.findIndex(v => v.id === item.id)
    let newTodoList = data.todoList[index]
    // 弹窗
    ElMessageBox.prompt('修改待办事项', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: newTodoList.text,
        autofocus: true
    })
        .then(({ value }) => {
            if (value) {
                data.todoList.splice(index, 1, {
                    id: newTodoList.id,
                    text: value,
                    finished: newTodoList.finished
                })
            }
            ElMessage({
                type: 'success',
                message: '修改成功',
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消修改',
            })
        })

}


// 用于存放已完成的Item
let finishedItem: TodoItem[] = reactive([])

// const onFinishedItem = (item: TodoItem) => {
//     // 为什么输出两遍？？？？？
//     // console.log(item);

//     item = {
//         id: item.id,
//         text: item.text,
//         finished: !item.finished
//     }
//     if (item.finished === true) {
//         finishedItem.push(item)
//     }

//     // let index = data.todoList.findIndex(v => v.id === item.id)
//     // console.log(index);
//     // data.todoList.splice(index, 1)

// }


const onFinishedItem = (item: TodoItem) => {

    ElMessageBox.confirm(
        '请确认是否已完成',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            // type: 'warning',
        }
    )
        .then(() => {
            item = {
                id: item.id,
                text: item.text,
                finished: item.finished
            }
            if (item.finished === true) {
                let index = data.todoList.findIndex(v => v.id === item.id)
                // console.log(index);
                data.todoList.splice(index, 1)
                finishedItem.push(item)
                ElMessage({
                    type: 'success',
                    message: '已完成',
                })

            }
            if (item.finished === false) {
                ElMessage({
                    type: 'info',
                    message: '请先选择待办事项',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
        })

    console.log(finishedItem);

}

const UnfinishInfo = () => {
    ElMessage('请先选择已完成的待办事项');
}

const onDeleteFinishedItem = (item: TodoItem) => {
    let index = finishedItem.findIndex(v => v.id === item.id)
    finishedItem.splice(index, 1)
}

</script>

<template>
    <div class="demo">
        <div class="content">
            <div class="header">
                <el-input type="text" autocomplete="off" v-model="data.inputVal" placeholder="输入待办事项..."
                    :prefix-icon="Plus" @keydown.enter="addItem" />
                <el-button type="primary" :icon="Plus" :disabled='data.inputVal.trim() ? false : true' @click="addItem">
                    添加
                </el-button>
            </div>
            <div class="body">
                <!-- <div class="list">
                    <el-checkbox v-model="data.checked">已完成事项({{ finishedItem.length }})</el-checkbox>
                </div> -->

                <el-empty v-if="data.todoList.length === 0 && finishedItem.length === 0" description="暂无待办事项" />

                <template v-else>
                    <el-scrollbar max-height="400px">
                        <div v-show="data.todoList.length !== 0">未完成事项({{ data.todoList.length }})</div>
                        <div v-for="item in data.todoList" class="scrollbar-demo-item">
                            <div style="margin-left: 10px;">
                                <!-- <el-checkbox v-model="item.finished" @click="onFinishedItem(item)" size="large" /> -->
                                <el-checkbox v-model="item.finished" size="large" />
                                {{ item.text }}
                            </div>
                            <div>
                                <el-button size="small" text :icon="Delete" @click="onDeleteItem(item)">删除</el-button>
                                <el-button size="small" text :icon="Edit" @click="onEditItem(item)">修改</el-button>
                                <el-button size="small" text :icon="DocumentChecked"
                                    @click="item.finished === true ? onFinishedItem(item) : UnfinishInfo">
                                    完成
                                </el-button>
                            </div>
                        </div>
                    </el-scrollbar>


                    <el-scrollbar max-height="400px">
                        <div v-show="finishedItem.length !== 0">已完成事项({{ finishedItem.length }})</div>
                        <div v-for="item in finishedItem" class="scrollbar-demo-item">
                            <div style="margin-left: 10px;text-decoration: line-through;">
                                <!-- <el-checkbox v-model="item.finished" size="large" /> -->
                                {{ item.text }}
                            </div>
                            <div>
                                <el-button size="small" text :icon="Delete" @click="onDeleteFinishedItem(item)">
                                    删除
                                </el-button>
                            </div>
                        </div>
                    </el-scrollbar>
                </template>

            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.demo {
    display: flex;
    justify-content: center;

    .content {
        width: 400px;
        margin-top: 10px;

        .header {
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid gray;

            :deep(.el-button) {
                margin-left: 10px;
            }
        }

        .body {
            .scrollbar-demo-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                margin: 10px;
                text-align: center;
                border-radius: 4px;
                border: 1px solid gray;
            }
        }

    }
}
</style>