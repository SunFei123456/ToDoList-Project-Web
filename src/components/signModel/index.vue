<template>
    <div v-show="open">
        <!-- 遮罩层 -->
        <div class="mask" @click="open = false">

        </div>
        <!-- 弹出层 -->
        <div class="popup" :style="{ background: gradientColor }">
            <!-- 当前日期 -->
            <div class="commonStyle Day">
                {{ date }}
            </div>
            <!-- 当前年月 -->
            <div class="commonStyle YearAndMonth">
                {{ year }}.{{ month }}
            </div>

            <div class="text">{{ quote }}</div>

            <button class="signIn" @click="singIn" v-if="!IsHavaSign">立即签到 </button>
            <button class="signIn" v-else :disabled="!IsHavaSign">当天已经签到 </button>
        </div>
       
    </div>
</template>

<script lang='ts' setup>
import { getIsSignIn, updateUserSignDays } from "@/apis/user";
import { notification } from 'ant-design-vue';

import { getCurrentUserid } from "@/utils/CurrentUserid";
import dayjs from "dayjs";
import { ref, defineExpose, onMounted } from "vue"
import { useUserStore } from "@/store/user/userStore";
const open = ref<boolean>(false)
const currentUser = useUserStore()
const IsHavaSign = ref<boolean>(false)

const year = ref()
const month = ref()
const date = ref()
const gradientColor = ref<string>('')

const quote = ref<string>('')

// 定义6个渐变颜色数组
const generateRandomGradient = () => {
    const r1 = Math.floor(Math.random() * 256);
    const g1 = Math.floor(Math.random() * 256);
    const b1 = Math.floor(Math.random() * 256);
    const r2 = Math.floor(Math.random() * 256);
    const g2 = Math.floor(Math.random() * 256);
    const b2 = Math.floor(Math.random() * 256);
    // 生成渐变起点颜色
    const startColor = `rgb(${r1},${g1},${b1})`;
    // 生成渐变终点颜色
    const endColor = `rgb(${r2},${g2},${b2})`;
    // 随机决定渐变方向
    const direction = Math.random() > 0.5 ? '45deg' : '90deg';
    // 应用样式
    gradientColor.value = `linear-gradient(${direction},${startColor} 0%, ${endColor} 100%)`;
}

// 签到
const singIn = async () => {
   
    const res: any = await updateUserSignDays(getCurrentUserid())
    // 当天签到
    if (res.code === 200 && res.message == "签到成功") {
        IsHavaSign.value = true
        notification.success({
            message: `签到成功,奖励:${res.reward}`,
        })
        // 签到奖励经验 15分
        currentUser.experience += 15
        // 签到奖励贝壳点
        currentUser.points += 10
    }
    // 两秒之后 自动关闭弹框
    setTimeout(() => {
        open.value = false
    }, 1500)
 
    
}

onMounted(async () => {
    // 使用dayjs获取当前的年月份
    let now = dayjs()
    year.value = "" + now.year()
    month.value = "0" + (now.month() + 1)
    now.date() < 10 ? date.value = "0" + now.date() : date.value = now.date()

    const res = await getIsSignIn(getCurrentUserid())
    IsHavaSign.value = res.data.is_sign_in_today
})
// 获取每日一言
const getQuote = async () => {
    const url = import.meta.env.VITE_SERVER_URL + "/get_sentiment"
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json()
        if (data.code == 200) {
            quote.value = data.sentiment
        }else{
            quote.value = '今天没有每日一言哦'
        }
    }
}

const openModel = async () => {
    await generateRandomGradient()
    await getQuote()
    open.value = true
}


// 暴露变量
defineExpose({ openModel })

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
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 400px;
    border-radius: 16px;
    padding: 1rem;
    z-index: 1000;
    transition: all 0.25s linear;
    

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

    .text {
        font-size: 14px;
        color: #fff;

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