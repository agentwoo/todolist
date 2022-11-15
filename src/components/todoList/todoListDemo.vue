<!-- 参考完善-->
<script lang='ts' setup>
import { reactive, toRefs, ref, computed, resolveComponent } from 'vue'
import { Plus, Delete, Edit, Finished } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface todoListItem {
    text: string,
    finished: boolean
}

const data = reactive({
    inputlVal: '',
    todoList: [] as todoListItem[],
    currentEditItem: null as null | todoListItem,
    showEditDialog: false,
    showFinishedItem: false,
    editForm: {
        text: ''
    }
})

// 用于存储checkbox的todolistItem
const todoList$ = computed(() => {
    if (data.showFinishedItem) return data.todoList
    //过滤出未完成的item
    return data.todoList.filter(v => !v.finished)
})

// 计算已完成的数量
const finishedItemCount$ = computed(() => {
    return data.todoList.filter(v => v.finished).length
})


// 添加待办事项
const addItem = () => {
    // 输入框为空，直接返回
    if (!data.inputlVal.trim()) return

    let index = data.todoList.findIndex(v => v.text === data.inputlVal.trim());
    let newItem = {
        text: data.inputlVal.trim(),
        finished: false
    }
    index === -1 ? (data.todoList.push(newItem), successMessage('添加成功')) : errMessage('该事项已存在')
    // 清空输入框
    data.inputlVal = '';

    // console.log(data.todoList);
}


// 编辑待办事项
let editFrom = ref()

// 编辑弹窗
const editItem = (item: todoListItem) => {
    data.editForm.text = item.text
    data.currentEditItem = item
    data.showEditDialog = true
}

// 编辑表单校验规则
function editFromValidate(rule: any, value: string, callback: any) {
    const v = value.trim()
    if (!v) return callback('待办事项不能为空')

    let isExist = data.todoList.some(i => i.text === v)
    return callback(isExist ? '该事项已存在' : undefined)
}

// 确定编辑待办事项
async function confirmEdit() {
    // 获取表单组件
    const $form = editFrom.value
    if (!$form) return

    // 添加校验规则
    const valid = await $form.validate()
    if (!valid) return

    // 获取当前数据
    const currentItem = data.currentEditItem
    if (!currentItem) return

    // 获取当前编辑项位置
    let index = data.todoList.findIndex(v => v.text === currentItem.text)
    if (index === -1) return

    // 更新当前待办事项
    const updaText = data.editForm.text.trim()
    // data.todoList.splice(index, 1, { ...currentItem, text: updaText })
    data.todoList.splice(index, 1, { text: updaText, finished: false })
    successMessage('编辑成功！')

    // 清空数据
    data.showEditDialog = false
    // data.editForm.text = ''
    // data.currentEditItem = null


}

const cancelEdit = () => {
    data.showEditDialog = false
    errMessage('取消编辑')
}


// 删除待办事项
async function delItem(item: todoListItem) {
    let comfirm = await showConfirm('是否删除当前待办事项', '提示')
    if (!comfirm) return errMessage('取消删除')

    let index = data.todoList.findIndex(v => v.text === item.text)
    data.todoList.splice(index, 1)
    successMessage('删除成功!')
}

// 确认框--删除
function showConfirm(message: string, title: string): Promise<boolean> {
    return new Promise((resolve) => {
        let opts = {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
        ElMessageBox.confirm(message, title, opts)
            .then(() => { resolve(true) })
            .catch(() => { resolve(false) })
    })
}



// 操作成功提示
function successMessage(successInfo: string) {
    ElMessage.success(successInfo)
}
// 操作失败或取消提示
function errMessage(errInfo: string) {
    ElMessage.error(errInfo)
}

</script>

<template>
    <div class="todoList">
        <div class="container">
            <div class="header">
                <el-input type="text" :prefix-icon="Plus" v-model="data.inputlVal" autocomplete="off"
                    @keyup.enter="addItem" placeholder="请输入待办事项...." />
                <el-button type="primary" :icon="Plus" style="margin-left: 10px;" :disabled="!data.inputlVal.trim()"
                    @click="addItem">
                    添加
                </el-button>
            </div>
            <!-- 统计待办项 -->
            <el-checkbox size="large" v-model="data.showFinishedItem">已完成事项( {{ finishedItemCount$ }} )</el-checkbox>

            <el-empty v-if="data.todoList.length === 0" description="暂无待办事项" />

            <!-- 展示待办项/已完成 -->
            <template v-else>
                <el-scrollbar height="400px">
                    <div v-for="(item, index) in todoList$" :key="index" class="scrollbar-demo-item"
                        :class="{ isFinished: item.finished }">
                        <div class="itemText">
                            <el-checkbox size="large" v-model="item.finished" />
                            {{ item.text }}
                        </div>
                        <div>
                            <el-button text v-if="!item.finished" :icon="Edit" @click="editItem(item)">修改</el-button>
                            <el-button text :icon="Delete" @click="delItem(item)">删除</el-button>
                        </div>
                    </div>
                </el-scrollbar>
            </template>

            <!-- 编辑弹窗 -->
            <el-dialog v-model="data.showEditDialog" title="编辑待办事项">
                <el-form :model="data.editForm" ref="editFrom">
                    <el-form-item label="待办事项" label-width="80px" prop="text"
                        :rules="[{ validator: editFromValidate }]">
                        <el-input v-model="data.editForm.text" autocomplete="off" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelEdit">取消</el-button>
                        <el-button type="primary" @click="confirmEdit">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>

        </div>
    </div>
</template>

<style lang='scss' scoped>
.todoList {
    display: flex;
    justify-content: center;

    .container {
        width: 500px;

        .header {
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid gray;
        }

        .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            margin: 10px;
            padding: 0 15px;
            text-align: center;
            border-radius: 4px;
            color: var(--el-color-primary);
            border: 1px solid gray;
        }

        // 当finished为true时，添加该样式
        .isFinished .itemText {
            text-decoration: line-through;
            color: gray;
        }
    }
}
</style>