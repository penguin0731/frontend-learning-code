<template>
  <div>
    <h4>state:{{ count }}</h4>
    <h4>doubleCount: {{ doubleCount }}</h4>
    <button @click="changeCount(10)">点击mutations</button>
    <button @click="actionsAdd(10)">点击nations</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['changeCount']),
    ...mapActions({
      actionsAdd: 'changeCount'
    })
  }
}
</script>
