<template>
    <div class="add-student">
        <div>添加学生：{{ newPerson }}</div>
        <div>姓名：<input type="text" v-model="name"></div>
        <div>年龄：<input type="text" v-model="age"></div>
        <div><button @click="handleClick">添加</button></div>
        <hr />
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data () {
        return {
            name: '',
            age: null
        }
    },
    methods: {
        // ...mapMutations(['changeStudentList']),
        ...mapActions(['changeStudentList']),
        handleClick () {
            // 在严格模式里不能够进行双向数据改变
            // 只能从state中将数据渲染，不能在mutations外修改数据
            const tempObj = {
                name: this.name,
                age: this.age,
                id: +new Date()
            }
            console.log(tempObj);
            // this.$store.state.studentList.push(tempObj);

            // mutations
            // this.$store.commit('changeStudentList');
            // this.$store.commit('changeStudentList', {tempObj, name: '渡一'});

            // this.changeStudentList({tempObj, name: '渡一'});

            // 执行actions里的changeStudentList
            // this.$store.dispatch('changeStudentList', {tempObj, name: '渡一'});
            this.changeStudentList({tempObj, name: '渡一'});
        }
    },
    computed: {
        // 当store对象里的属性与data里的属性冲突时，可以改名在mapState中传入对象
        // ...mapState(['age']),
        // ...mapState({
        //     // 参数state就是store.js里的state对象
        //     StoreName: state => state.name
        // })

        // ...mapGetters(['person']),
        ...mapGetters({
            newPerson: 'person'
        })
    }
}
</script>

<style scoped>
    div{
        margin-bottom: 15px;
    }
</style>