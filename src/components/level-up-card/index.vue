<template>
    <div v-show="open">
        <!-- 遮罩层 -->
        <div class="mask" @click="open = false">

        </div>
        <!-- 弹出层 -->
        <div class="popup">
            <div class="levelimg">
                <img src="@/assets/webp/levelUp.webp" alt="levelUp" class="levelUp">
            </div>
            <div class="content">
                <div class="shengjitext">
                    <div class="text">恭喜你升级了 </div>
                    <div class="text">Lv{{ userInfo.level }} </div>
                    <div class="text">至今你已经注册ToDoList <span> {{ registerdays }}</span>天</div>
                    <div class="text">制定了 <span> {{ tasksTotalNum }}</span>个任务</div>
                    <div class="text">总共完成了 <span> {{ FinishTasksNum }}</span>个任务</div>
                </div>
            </div>
            <button class="getLevelUpPrize" @click="getPrize">领取奖励</button>

        </div>
    </div>

</template>

<script lang='ts' setup>
import { getLevelUpPrize } from "@/apis/prize";
import { getCompleteTaskNum, getTaskNum } from "@/apis/task";
import { getRegistrationDays } from "@/apis/user";
import { useUserStore } from "@/store/user/userStore";
import { getCurrentUserid } from "@/utils/CurrentUserid";
import { notification } from "ant-design-vue";
import { ref, onMounted } from "vue"
const open = ref<boolean>(false)
const userInfo = useUserStore()



const openModel = () => {
    open.value = true
};

// 点击领取奖励
const getPrize = async () => {
    const res: any = await getLevelUpPrize(getCurrentUserid())
    // 如果请求成功, 进行提示, 并且将store -> userInfo -> 的贝壳点进行后端同步
    if (res.code == 200) {
        notification.success({
            message: `领取成功,获得${res.get_points}贝壳`,
        })
        // 同步一下本地仓库
        userInfo.points += res.get_points
    }
    // 1500ms后关闭弹窗
    setTimeout(() => {
        open.value = false
    }, 1500)

}

const tasksTotalNum = ref()
// 获取任务总量
const gettodoListNum = async () => {
    try {
        const res: any = await getTaskNum(getCurrentUserid())
        if (res.code == 200) {
            tasksTotalNum.value = res.nums
        } else {
            tasksTotalNum.value = 0
            notification.error({
                message: "接口请求出错"
            })
        }
    } catch (error) {
        tasksTotalNum.value = 0
        notification.error({
            message: error
        })
    }


}
const FinishTasksNum = ref()
// 获取完成的任务量
const getFinishListNum = async () => {
    try {
        const res: any = await getCompleteTaskNum(getCurrentUserid())
        console.log(res);
        if (res.code == 200) {
            FinishTasksNum.value = res.nums
        } else {
            FinishTasksNum.value = 0
            notification.error({
                message: "接口请求出错"
            })
        }
    } catch (error) {
        FinishTasksNum.value = 0
        notification.error({
            message: error
        })
    }


}

// 获取注册天数
const registerdays = ref()
const getRegisterOfCurrentUser = async () => {

    const res: any = await getRegistrationDays(getCurrentUserid())
    registerdays.value = parseInt(res.data.registration_days);
}
onMounted(() => {
    gettodoListNum()
    getFinishListNum()
    getRegisterOfCurrentUser()
})
// 暴露给父组件open方法
defineExpose({
    openModel
})





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
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 400px;
    border-radius: 16px;
    z-index: 1000;
    transition: all 0.25s linear;

    background-color: #fff;

    .levelimg {
        position: absolute;
        top: -10px;
        left: 0px;
        width: 100%;
        background: linear-gradient(to right, rgb(137, 104, 255), rgb(175, 152, 255));

        .levelUp {
            width: 100%;
        }
    }

    .content {
        margin-top: 80px;
        height: -webkit-fill-available;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: antiquewhite;

        .shengjitext {
            margin-top: 1rem;
            text-align: center;

            .text {
                font-size: 14px;
                color: #5e5d5d;

                span {
                    font-size: 18px;
                    font-weight: 800;
                    color: coral;
                    ;
                }

                // 选择第一个text元素
                &:first-child {
                    font-size: 18px;
                    font-weight: 600;
                    color: #000;
                }

                // 选择第二个text元素
                &:nth-child(2) {
                    font-size: 20px;
                    font-weight: 800;
                    color: coral;
                }
            }

        }


    }




    // 签到按钮
    .getLevelUpPrize {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem;
        width: 90%;
        height: 50px;
        border-radius: 8px;
        background-color: rgb(253, 143, 0);
        border: 2px solid #fff;
        color: #fff;
        // 过渡
        transition: all 0.3s linear;

        // 悬停
        &:hover {
            border: 2px solid rgb(253, 143, 0);
            color: rgb(0, 0, 0);
        }
    }

}
</style>