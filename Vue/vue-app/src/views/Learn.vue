<template>
    <div class="learn">
        <!-- {{ this.$store.state.learn.courseName}}
        {{ this.$store.getters.coursePrice }} -->
        {{ courseName }}
        {{ coursePrice }}
        <button @click="handleClick">涨价</button>
    </div>
</template>

<script>
import { mapState, mapGetters} from 'vuex'
export default {
    computed: {
        ...mapState('learn', ['courseName']),
        ...mapGetters('learn', ['coursePrice'])
    },
    methods: {
        handleClick () {
            this.$store.commit('learn/changePrice', {price: 30})
        }
    }
}
</script>