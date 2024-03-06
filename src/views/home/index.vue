<template>
    <div class="box">
        <!-- 头部 -->
        <HomeHeader> </HomeHeader>
        <!-- 基本信息模块 -->
        <div class="content">
            <a-card title="基本信息" :hoverable="cardHover" class="introduce-card">
                <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
                    <a-descriptions-item label="🚩姓名">
                        <a-tag color="#dd9c00">{{ userInfo.owner.name }}</a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="♾️年龄">{{ userInfo.age }}</a-descriptions-item>
                    <a-descriptions-item label="✅性别">{{ userInfo.gender }}</a-descriptions-item>
                    <a-descriptions-item label="🏡居住地">
                        <a-tag color="#982330"> 地球村🌏 </a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="🤖爱好">
                        <a-tag :color="getRandomBrightColor()" v-for="item in hobbies">{{ item }}</a-tag>
                    </a-descriptions-item>

                    <a-descriptions-item label="📮邮箱">
                        <a-tag color="#ff7500"> {{ userInfo.owner.email }} </a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="☎️电话">
                        <a-tag color="#158710"> {{ userInfo.phone || '暂无' }} </a-tag>
                    </a-descriptions-item>


                    <a-descriptions-item label="🐧号">
                        <a-tag color="#2add9c">{{ userInfo.owner.email.replace(/\D/g, '') }}</a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="™️®️个性签名">
                        <a-tag color="#d9c">{{ userInfo.introduction }}</a-tag>

                    </a-descriptions-item>
                </a-descriptions>
            </a-card>
        </div>


        <!-- echart 图表模块 组件 -->
        <div class="Home-EchartsList">
            <!-- 图表一 -->

            <lineCharts class="Charts"></lineCharts>
            <!-- 图表二 -->
            <pieChart class="Charts"></pieChart>
            <!-- 图表三 -->
        </div>

    </div>
    <!-- 暂定  -->
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
// 导入Home - Header.vue 组件
import HomeHeader from "@components/Home-Header.vue";
// 导入Echarts ==> 折线图
import lineCharts from "@components/echarts/line-chart.vue";
// 导入Echarts ==> 饼状图
import pieChart from "@components/echarts/pie-chart.vue";
import { useUserStore } from "@/store/user/userStore";
const userInfo = useUserStore()
import { getRandomBrightColor } from "@/utils";

let hobbies: any = null
if (userInfo.hobbies) {
    hobbies = userInfo.hobbies.split(',')
}else{
    hobbies = ['吃饭', '睡觉', '打游戏']
}



// a-crad hover时的激活状态
const cardHover = ref<boolean>(true);


</script>
  
<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    background-color: #e6e5e5;
    padding: 1rem;
    gap: 1rem;
}

// 间隔
$gap: 16px;

.ant-layout-content {
    background-color: #000;
    color: #fff;
}



.content {
    display: flex;
    justify-content: space-between;
    gap: $gap;
}



.Home-EchartsList {
    display: flex;
    gap: $gap;
}






@media (max-width: 800px) {

    // 整体内容
    .content {
        flex-direction: column;
    }

    // 进度
    .process {
        display: flex;


        flex-direction: column;
    }

    // 图表

    .Home-EchartsList {
        flex-direction: column;

        .Charts {
            width: 100% !important;
        }
    }

}
</style>
  