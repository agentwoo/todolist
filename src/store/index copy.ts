import { defineStore } from "pinia";
import { watch } from "vue";
import { Names } from './store-name'


interface todoListItem {
    text: string,
    finished: boolean
}

export const useTodoListStore = defineStore(Names.TODOLIST, {
    state: () => {
        return {
            showFinished: false,
            todoList: JSON.parse(localStorage.getItem('todoList') as string) || [] as todoListItem[]
        }
    },
    getters: {
        finishedCount(): number {
            return this.todoList.filter((v: { finished: boolean; }) => v.finished).length
        },
        // 传入state参数，ts会自动推导出返回值类型
        unFinishedCount(state) {
            return state.todoList.filter((v: { finished: boolean }) => !v.finished).length
        },
        todoList(): todoListItem[] {
            if (this.showFinished) return this.todoList.filter((v: { finished: boolean; }) => v.finished)
            return this.todoList.filter((v: { finished: boolean; }) => !v.finished)
        }

    },
    actions: {
        addItem(Val: string) {
            let inputlVal = Val.trim()
            if (!inputlVal)
                return false
            let index = this.todoList.findIndex((v: { text: string; }) => v.text === inputlVal)
            if (index !== -1)
                return false
            this.todoList.push({ finished: false, text: inputlVal })
            return true
        },
        delItem(item: todoListItem) {
            let index = this.todoList.findIndex((v: { text: string; }) => v.text === item.text)
            if (index === -1)
                return false
            this.todoList.splice(index, 1)
            return true
        },
        editItem(item: todoListItem | null, text: string) {
            const currentItem = item
            if (!currentItem)
                return false
            let index = this.todoList.findIndex((v: { text: string; }) => v.text === currentItem?.text)
            if (index === -1)
                return false
            let updaText = text.trim()
            this.todoList.splice(index, 1, { finished: false, text: updaText })
            return true
        }
    }
})


export const useTest = defineStore(Names.TEST, {
    // 类似于组件的 data，用来存储全局状态的
    // 必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    state: () => {
        return {

        }
    },
    // 类似于组件的computed，用来封装计算属性，有缓存的功能
    getters: {

    },
    // 类似于组件的methods，封装业务逻辑，修改state
    actions: {

    }
})