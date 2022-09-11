<template>
  <div class="list-item">
    <span>{{ item.content }}</span>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>
.list-item {
    text-align: center;
    height: 52px;
    line-height: 52px;
    box-sizing: border-box;
    border-bottom: 1px solid;
}
</style>