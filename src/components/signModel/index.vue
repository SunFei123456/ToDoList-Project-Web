<template>
    <div v-show="open">
        <!-- 遮罩层 -->
        <div class="mask" @click="open = false">

        </div>

        <!-- 弹出层 -->
        <div class="popup" :style="{ backgroundImage: `url(/src/assets/webp/${generateRandomNumber()}.jpg)` }">
            <!-- 当前日期 -->
            <div class="commonStyle Day">
                {{ date }}
            </div>
            <!-- 当前年月 -->
            <div class="commonStyle YearAndMonth">
                {{ year }}.{{ month }}
            </div>
            <button class="signIn" @click="singIn" v-if="!IsHavaSign">立即签到 </button>
            <button class="signIn" v-else :disabled="!IsHavaSign">当天已经签到 </button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { getIsSignIn, updateUserSignDays } from "@/apis/user";
import { sunfeiMessage } from "@/utils";
import { getCurrentUserid } from "@/utils/CurrentUserid";
import dayjs from "dayjs";
import { ref, defineExpose, onMounted } from "vue"
const open = ref<boolean>(false)

const IsHavaSign = ref<boolean>(false)

const year = ref()
const month = ref()
const date = ref()

// 生成随机1,6数字 用来拼接背景图片
// 生成 1 到 6 之间的随机整数
function generateRandomNumber() {
    // Math.random() 生成 0 到 1 之间的小数
    // 乘以 6，将范围变为 0 到 5 之间的小数
    // 使用 Math.floor() 向下取整，得到 0 到 5 之间的整数
    // 最后加上 1，将范围变为 1 到 6 之间的整数
    return Math.floor(Math.random() * 6) + 1;
}
// 签到
const singIn = async () => {
    const res: any = await updateUserSignDays(getCurrentUserid())
    console.log(res);
    if (res.code === 200) {
        // 表示今天已经签到
        IsHavaSign.value = true
        sunfeiMessage("warning", res.message)
    }
    // 关闭弹出层
    open.value = false

}

onMounted(async () => {
    // 使用dayjs获取当前的年月份
    let now = dayjs()
    year.value = "" + now.year()
    month.value = "0" + (now.month() + 1)
    date.value = "0" + now.date()

    const res = await getIsSignIn(getCurrentUserid())
    IsHavaSign.value = res.data.is_sign_in_today
})

// 暴露变量
defineExpose({ open })

</script>

<style lang='scss' scoped>
// 遮罩层样式
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
}

// 弹出层
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 400px;
    border-radius: 16px;
    background-size: cover;
    background-position: center center;
    z-index: 1000;

    // 下面共同的样式进行抽离总和
    .commonStyle {
        position: absolute;
        right: 10px;
        width: 80px;
        background-color: transparent;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;

    }

    // 日期
    .Day {
        top: 10px;
        height: 80px;
        border-bottom: none;
        line-height: 80px;
        font-size: 40px;

    }

    // 年份和月份
    .YearAndMonth {
        top: 90px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }

    // 签到按钮
    .signIn {
        position: absolute;
        bottom: 10px;
        right: 15px;
        width: 90%;
        height: 50px;
        border-radius: 8px;
        background-color: transparent;
        border: 2px solid #fff;
        color: #fff;
        // 过渡
        transition: all 0.3s linear;

        // 悬停
        &:hover {
            border: 2px solid rgb(253, 143, 0);
            color: rgb(253, 143, 0);
        }
    }

}
</style>