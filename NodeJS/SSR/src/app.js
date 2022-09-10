import Vue from 'vue'
import app from './app.vue'

export default function () {
    return new Vue({
        template: `<app />`,
        components: {
            app
        }
    })
}