<template>
    <div id="left-of-home" :style="{ backgroundColor: userStore.owner.sidebar_bgColor }">
        <!-- 主题切换 -->
        <div id="theme">
            <img src="@/assets/svg/clothes.svg" alt="" width="25" height="25"
                @click="IsShowColorBoard = !IsShowColorBoard">
            <a-card style=" z-index: 1024;" v-show="IsShowColorBoard">
                <a-tabs v-model:activeKey="Key" style="width: 100%;">
                    <a-tab-pane key="1" tab="纯色">
                        <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
                            class="color-block" @click="changeBackgroundColor(color)"></div>
                    </a-tab-pane>
                </a-tabs>
            </a-card>
        </div>
        <!-- 签到 -->
        <button id="sign-in" @click="showSignInModal">签到</button>


        <a-avatar class="avatar" :src="userStore.avatar_url"></a-avatar>

        <!-- 头像 -->
        <span :style="{ fontSize: userStore.owner.name ? '1.2rem' : '1.25rem' }">
            {{ userStore.owner.name || '用户' }}
        </span>

        <span style="font-size: 0.75rem;">{{ userStore.introduction || '这里用来展示个人简介' }}</span>



        <div class="routerIcon">
            <a-tooltip placement="top">
                <template #title>
                    <span>首页</span>
                </template>
                <button @click="goPath('home')" class="btn" :class="{ active: activeName === 'home' }">
                    <Icon size="20">
                        <Home />
                    </Icon>
                </button>
            </a-tooltip>

            <a-tooltip placement="top">

                <template #title>
                    <span>任务列表</span>
                </template>
                <button @click="goPath('list')" class="btn" :class="{ active: activeName === 'list' }">
                    <Icon size="20">
                        <List />
                    </Icon>
                </button>
            </a-tooltip>

            <a-tooltip placement="top">

                <template #title>
                    <span>简约任务描述</span>
                </template>
                <button class="btn" @click="goPath('simple-list')" :class="{ active: activeName === 'simple-list' }">
                    <Icon size="20">
                        <SimpleList />
                    </Icon>
                </button>
            </a-tooltip>

            <a-tooltip placement="top">

                <template #title>
                    <span>数据可视化</span>
                </template>
                <button @click="goPath('DataMetrics')" class="btn" :class="{ active: activeName === 'DataMetrics' }">
                    <Icon size="20">
                        <CellularOutline />
                    </Icon>
                </button>
            </a-tooltip>


            <!-- 排行榜 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>排行榜</span>
                </template>
                <button class="btn" @click="goPath('rankings')" :class="{ active: activeName === 'rankings' }">
                    <Icon size="20">
                        <Rankings />
                    </Icon>
                </button>
            </a-tooltip>

            <!-- 有奖活动 -->
            <a-tooltip placement="top">
                <template #title>
                    <span>活动</span>
                </template>
                <button class="btn" @click="goPath('activity')" :class="{ active: activeName === 'activity' }">
                    <Icon size="20">
                        <Activity />
                    </Icon>
                </button>
            </a-tooltip>


            <!-- 个人信息 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>个人信息</span>
                </template>
                <button class="btn" @click="goPath('userInfo')" :class="{ active: activeName === 'userInfo' }">
                    <Icon size="20">
                        <userInfo />
                    </Icon>
                </button>
            </a-tooltip>


            <!-- 全屏切换 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>全屏</span>
                </template>
                <button class="btn" :class="{ active: isFullScreen }">
                    <Icon size="20" v-if="isFullScreen" @click="changeScreen">
                        <CompressOutlined />
                    </Icon>
                    <Icon size="20" v-else @click="changeScreen">
                        <Fullscrenn />
                    </Icon>
                </button>
            </a-tooltip>

            <!-- 切换账号 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>切换账号</span>
                </template>
                <button class="btn" @click="goPath('login')" :class="{ active: activeName === 'login' }">
                    <Icon size="20">
                        <ChangeAccount />
                    </Icon>
                </button>
            </a-tooltip>



            <!-- 退出登录 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>退出</span>
                </template>
                <a-popconfirm title="确认要退出登录吗?" ok-text="Yes" cancel-text="No" @confirm="confirm" @cancel="cancel">
                    <button class="btn">
                        <Icon size="22">
                            <LoginOut />
                        </Icon>
                    </button>
                </a-popconfirm>
            </a-tooltip>

            <!-- 项目Github 地址 -->
            <a-tooltip placement="top">

                <template #title>
                    <span>GitHub</span>
                </template>
                <button class="btn" @click="goGithub">
                    <Icon size="20">
                        <Github />
                    </Icon>
                </button>
            </a-tooltip>
        </div>

    </div>
    <SignModel ref="signmodelRef"></SignModel>
</template>

<script lang='ts' setup>
import router from "@/router/index.ts";


// compress-outlined
import { Icon } from "@vicons/utils";
import { CompressOutlined } from '@ant-design/icons-vue'


import {
    HomeOutline as Home,
    CheckboxOutline as List,
    LogoElectron as userInfo,
    List as SimpleList,
    LogoGithub as Github,
    SwapHorizontal as ChangeAccount,
    LogInOutline as LoginOut,
    ScanOutline as Fullscrenn,
    CellularOutline,
    TrophyOutline as Rankings,
    RocketOutline as Activity
} from "@vicons/ionicons5";

import { message } from 'ant-design-vue'
import { ref } from 'vue'

import { useUserStore } from "@/store/user/userStore";
import { updateUserSidebarColor } from "@/apis/user";
import { getCurrentUserid } from "@/utils/CurrentUserid";
import { sunfeiMessage } from "@/utils";
import SignModel from "@/components/signModel/index.vue";

const signmodelRef = ref<any>()
const userStore = useUserStore()

const isFullScreen = ref(false)
const IsShowColorBoard = ref(false)


// 默认home
const activeName = ref("home")
const goPath = (url: string) => {
    console.log(url);
    activeName.value = url
    // 当前按钮修改颜色 active
    router.push(`/${url}`)
}

const Key = ref("1")



const showSignInModal = () => {
    userStore.experience += 200
    
    // 使用定时器，优化用户体验一下

    signmodelRef.value.openModel()

    // 打开签到弹窗

}

// 跳转GitHub
function goGithub() {
    window.open("http://www.baidu.com/", "_blank");
}

// 退出确认
const confirm = (e: MouseEvent) => {
    console.log(e);
    // 清除登录信息
    localStorage.clear()
    router.push({ name: "login" })
    message.success('退出成功');
};
// 退出取消
const cancel = (e: MouseEvent) => {
    console.log(e);
    message.info('用户取消了登录');
};

// 全屏
// 如果用户使用了键盘的esc进行退出
// 全局监听


const onKeyUp = (e: KeyboardEvent) => {
    if (e.code == "Escape") {
        console.log("===", isFullScreen.value);
        isFullScreen.value = false
        console.log("孙飞", isFullScreen.value);

    }
}
document.addEventListener("keyup", onKeyUp)

// 纯色
const colors = [
    '#ffffff', 'rgb(255,92,138)', 'rgb(113,127,249)', 'rgb(255,143,87)', 'rgb(255,215,0)', '#FFDAFE',
    '#82FFB6', '#4C9CA9', '#D3B9FF', '#fb4b00', '#00d8dd', '#C9D6FF'
];


const changeBackgroundColor = async (color: string) => {
    // 拿到元素
    const el = document.getElementById("left-of-home") as HTMLDivElement
    // 将main的背景颜色设置为点击的颜色
    el.style.backgroundColor = color;
    // 更新userstroe中的颜色
    userStore.owner.sidebar_bgColor = color

    // 调取接口 更新数据库对应的字段值
    const res: any = await updateUserSidebarColor(getCurrentUserid(), color)
    if (res.code === 200) {
        sunfeiMessage('success', '修改侧边栏背景颜色成功')
    }

    // 关闭颜色板
    IsShowColorBoard.value = false

};



// 全屏
const changeScreen = () => {
    // 如果当前是全屏
    if (isFullScreen.value) {
        console.log("===", isFullScreen.value);
        // 退出
        document.exitFullscreen();
        isFullScreen.value = !isFullScreen.value

    }
    else {
        // 进入
        document.documentElement.requestFullscreen();
        isFullScreen.value = !isFullScreen.value

    }
}




</script>

<style lang='scss' scoped>
// 点击哪个menu-> item  哪个item 高亮
.active {

    color: #1900ff;
}

#left-of-home {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    transition: background-color 0.2s ease-in-out;

    // 主题切换按钮的样式
    #theme {
        position: absolute;
        left: 10px;
        top: 10px;

        img {
            width: 25px;
            height: 25px;
            cursor: pointer;
            filter: contrast(0.8);
            transition: all 0.25s linear;
        }
    }


    // 签到按钮的样式
    #sign-in {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 15px 20px;
        font-size: 16px;
        background: transparent;
        border: none;
        color: #f0f0f0;
        z-index: 1;
    }

    #sign-in::after,
    #sign-in::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -99999;
        transition: all .4s;
    }

    #sign-in::before {
        transform: translate(0%, 0%);
        width: 100%;
        height: 100%;
        background: #28282d;
        border-radius: 10px;
    }

    #sign-in::after {
        transform: translate(10px, 10px);
        width: 35px;
        height: 35px;
        background: #ffffff15;
        backdrop-filter: blur(5px);
        border-radius: 50px;
    }

    #sign-in:hover::before {
        transform: translate(5%, 20%);
        width: 110%;
        height: 110%;
    }

    #sign-in:hover::after {
        border-radius: 10px;
        transform: translate(0, 0);
        width: 100%;
        height: 100%;
    }

    #sign-in:active::after {
        transition: 0s;
        transform: translate(0, 5%);
    }


    .avatar {
        width: 180px;
        height: 180px;
        object-fit: cover;
        transition: all 0.25s linear;
        cursor: pointer;

        &:hover {
            // border: 1px solid rgb(0, 0, 0);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }

    .routerIcon {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .btn {
            background-color: transparent;
            cursor: pointer;
            border: none;
        }
    }

}

.ant-card {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
}

.color-block {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 1px solid #233333;
    border-radius: 0.5rem;
}

.ant-tabs-tabpane {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: .625rem !important;
}
</style>