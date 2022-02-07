import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        picPath: '',
        keyWords: null,
        keyObj: null,
    },
    getters: {

    },
    mutations: {
        setKeyWords(state,keyWords) {
            console.log('key')
            state.keyWords = keyWords
        },
        setPicPath(state,picPath) {
            console.log('pic')
            state.picPath = picPath
        },
        setKeyObj(state,keyObj) {
            state.keyObj = keyObj
        },
    },
    actions: {

    }

})