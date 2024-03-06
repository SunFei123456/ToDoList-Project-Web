<template>
    <div class="contain">
        <div class="main">
            <div class="sunfei-a--card">
                <!-- 左侧 插图 -->
                <img src="../images/login.png" alt="">
                <!-- 右侧 文本 + 按钮 -->
                <div class="right">
                    <div class="title">
                        LOGIN
                    </div>
                    <div class="content">
                        乖乖,还没有登录哦. 登录之后才可以访问该页面呢
                    </div>
                    <button id="succeed-button" @click="() => { router.push('/login') }">登录</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang='ts' setup>
import router from '@/router';



</script>

<style lang='scss' scoped>
.contain {
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 60%;
        height: auto;
    }

    .right {
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        gap: 10px;

        .title {
            font-size: 23px;
            font-weight: 700;
            font-family: 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        .content {
            font-size: 14px;
            color: rgb(94, 94, 94);
        }
    }


}
</style>../utils/formatDateTime