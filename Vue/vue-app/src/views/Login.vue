<template>
    <div class="login" @click="handleClick">
        登录页
        <button @click="handleClick">登录</button>
    </div>
</template>

<script>
export default {
    methods: {
        handleClick () {
            const expires = 900 * 24 * 60 * 60* 1000; //900天*24h*60m*60s*1000ms
            const date = new Date(+new Date() + expires);
            document.cookie = `login=true;expires=${date.toUTCString(expires)}` //cookie存储900天
        }
    }
}
</script>