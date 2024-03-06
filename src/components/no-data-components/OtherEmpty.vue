<template>
    <div class="contain">
        <div class="main">
            <div class="sunfei-a--card">
                <!-- 左侧 插图 -->
                <img src="@/assets/webp/gotoTodoList.webp" alt="empty" loading="lazy">
                <!-- 右侧 文本 + 按钮 -->
                <div class="right">
                    <div class="title">
                        Cheer Up!
                    </div>
                    <div class="content">
                        点击下方按钮,去开启第一个任务旅程把! 让我们携手共进!
                    </div>
                    <button class="gotoMakeTask" @click="gotoListPage">前去制定第一个任务把 !</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang='ts' setup>
//  导入router
import router from "@/router";
const gotoListPage = ()=>{
    router.push('/list')
}


</script>

<style lang='scss' scoped>
.contain {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    .sunfei-a--card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

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

            .gotoMakeTask {
                z-index: 1;
                position: relative;
                font-size: inherit;
                font-family: inherit;
                color: white;
                padding: 0.5em 1em;
                outline: none;
                border: none;
                background-color: #fc2f70;
                

                &:before {
                    content: '';
                    z-index: -1;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: hsl(236, 32%, 26%);
                    transform-origin: center right;
                    transform: scaleX(0);
                    transition: transform 0.25s ease-in-out;

                }

                &:hover {
                    cursor: pointer;
                }

                &:hover:before {
                    transform-origin: center left;
                    transform: scaleX(1);
                }
            }
        }

        img {
            width: 80%;
            height: auto;
        }

    }





}

// 媒体查询
@media screen and (max-width: 768px) {
    .contain {
        height: 100%;
        flex-direction: column;
    }

    .main {

        .sunfei-a--card {
            flex-direction: column;
        }
    }
}
</style>