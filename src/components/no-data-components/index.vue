<template>
    <div class="contain">
        <div class="main">
            <div class="sunfei-a--card">
                <!-- 左侧 插图 -->
                <img src="@/assets/webp/empty.webp" alt="empty" loading="lazy">
                <!-- 右侧 文本 + 按钮 -->
                <div class="right">
                    <div class="title">
                        Fighting!!!
                    </div>
                    <div class="content">
                        乖乖,还没有制定计划哦,赶快点击右下方按钮制定计划,让我们一起努力吧!
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang='ts' setup>

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
        width: 40%;
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

// 媒体查询
@media screen and (max-width: 768px) {
    .contain {
        height: 100%;
        flex-direction:column;
    }

    .main {
   
        .sunfei-a--card{
            flex-direction: column;
        }
    }
}
</style>