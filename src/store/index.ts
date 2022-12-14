import { defineStore } from "pinia";
import { computed, reactive, toRefs, watch } from "vue";
import { Names } from './store-name'


interface todoListItem {
    text: string,
    finished: boolean
}

export const useTodoListStore = defineStore(Names.TODOLIST, () => {
    // state
    const state = reactive({
        showFinished: false,
        todoList: JSON.parse(localStorage.getItem('todoList') as string) || [] as todoListItem[]
    })
    // getters
    const finishedCount$ = computed(() => {
        return state.todoList.filter((v: { finished: boolean; }) => v.finished).length
    })
    const unFinishedCount$ = computed(() => {
        return state.todoList.filter((v: { finished: boolean }) => !v.finished).length
    })
    const todoList$ = computed(() => {
        if (state.showFinished) return state.todoList.filter((v: { finished: boolean; }) => v.finished)
        return state.todoList.filter((v: { finished: boolean; }) => !v.finished)
    })
    // actions
    function addItem(Val: string) {
        let inputlVal = Val.trim()
        if (!inputlVal) return false
        let index = state.todoList.findIndex((v: { text: string; }) => v.text === inputlVal)
        if (index !== -1) return false
        state.todoList.push({ finished: false, text: inputlVal })
        return true
    }
    function delItem(item: todoListItem) {
        let index = state.todoList.findIndex((v: { text: string; }) => v.text === item.text)
        if (index === -1) return false
        state.todoList.splice(index, 1)
        return true
    }
    function editItem(item: todoListItem | null, text: string) {
        const currentItem = item
        if (!currentItem) return false
        let index = state.todoList.findIndex((v: { text: string; }) => v.text === currentItem?.text)
        if (index === -1) return false
        let updaText = text.trim()
        state.todoList.splice(index, 1, { finished: false, text: updaText })
        return true
    }
    watch(() => state.todoList, (newVal) => {
        localStorage.setItem('todoList', JSON.stringify(newVal))
    }, {
        deep: true
    })
    return {
        ...toRefs(state),
        finishedCount$,
        unFinishedCount$,
        todoList$,
        addItem,
        delItem,
        editItem
    }
})


export const useTest = defineStore(Names.TEST, {
    // ?????????????????? data??????????????????????????????
    // ?????????????????????????????????????????????????????????????????????????????????????????????????????????
    state: () => {
        return {

        }
    },
    // ??????????????????computed????????????????????????????????????????????????
    getters: {

    },
    // ??????????????????methods??????????????????????????????state
    actions: {

    }
})