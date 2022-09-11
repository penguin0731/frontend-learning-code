<template>
    <div>
        <h4>{{ name }}</h4>
        <h4>{{ age }}</h4>
        <button @click="getName">获取name</button>
        <button @click="getAge">获取age</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            name: '',
            age: null
        }
    },
    methods: {
        getName () {
            axios.get('/name')
                .then(res => {
                    this.name = res.data.name;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getAge () {
            axios.get('/age')
                .then(res => {
                    this.age = res.data.age;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>