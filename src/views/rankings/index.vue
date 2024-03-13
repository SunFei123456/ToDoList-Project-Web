<template>
    <div class="rankings">

        <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" animated>
            <a-tab-pane key="1">
                <template #tab>
                    <span>
                        <apple-outlined />
                        总体的完成率
                    </span>
                </template>
                <div id="leaderboard">
                    <div class="user" v-for="(item, index) in RankingsData" :key="item.UserId">
                        <span :style="{ color: index <= 2 ? getRankColor(index) : 'black' }" class="left"># {{ index + 1
                            }}</span>
                        <div class="middle">
                            <img :src="item.UserAvatar" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.UserName }}</span>
                                <span class="Signatures">
                                    {{ item.introduction }} </span>
                                <!-- 蕈状 -->

                                <a-tag color="#0754ed" class="medals" v-if="item.medals === '项目开发者'">{{ item.medals
                                    }}</a-tag>

                                <a-tag color="blue" class="medals" v-else>{{ item.medals }}</a-tag>
                            </div>
                        </div>
                        <div class="right">
                            {{ Math.floor(item.CompleteRate) }} %
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2">

                <template #tab>
                    <span>
                        <android-outlined />
                        完成的任务量
                    </span>
                </template>
                <div id="leaderboard">
                    <div class="user" v-for="(item, index) in RankingsDataOfCompleteNum" :key="item.UserId">
                        <span class="left" :style="{ color: index <= 2 ? getRankColor(index) : 'black' }"># {{ index + 1
                            }}</span>
                        <div class="middle">
                            <img :src="item.avatar_url" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.nickName }}</span>
                                <span class="Signatures">
                                    {{ item.Signatures }} </span>


                                <a-tag color="#0754ed" class="medals" v-if="item.medals === '项目开发者'">{{ item.medals
                                    }}</a-tag>

                                <a-tag color="blue" class="medals" v-else>{{ item.medals }}</a-tag>
                            </div>
                        </div>
                        <div class="right">
                            {{ item.completeNum }} 个
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3">
                <template #tab>
                    <span>
                        <android-outlined />
                        未完成的任务量
                    </span>
                </template>
                <div id="leaderboard">
                    <div class="user" v-for="(item, index) in RankingsDataOfNoCompleteNum" :key="item.UserId">
                        <span class="left" :style="{ color: index <= 2 ? getRankColor(index) : 'black' }"># {{ index + 1
                            }}</span>
                        <div class="middle">
                            <img :src="item.avatar_url" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.nickName }}</span>
                                <span class="Signatures">
                                    {{ item.Signatures }} </span>

                                <a-tag color="#0754ed" class="medals" v-if="item.medals === '项目开发者'">{{ item.medals
                                    }}</a-tag>

                                <a-tag color="blue" class="medals" v-else>{{ item.medals }}</a-tag>
                            </div>
                        </div>
                        <div class="right">
                            {{ item.no_completeNum }} 个
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4">
                <template #tab>
                    <span>
                        <android-outlined />
                        累计签到天数排行榜
                    </span>
                </template>
                <div id="leaderboard">
                    <div class="user" v-for="(item, index) in RankingsDataOftotal_signDays" :key="index">
                        <span class="left" :style="{ color: index <= 2 ? getRankColor(index) : 'black' }"># {{ index + 1
                            }}</span>
                        <div class="middle">
                            <img :src="item.avatar_url" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.username }}</span>
                                <span class="Signatures">
                                    {{ item.introduce }} </span>

                                <a-tag color="#0754ed" class="medals" v-if="item.medals === '项目开发者'">{{ item.medals
                                    }}</a-tag>

                                <a-tag color="blue" class="medals" v-else>{{ item.medals }}</a-tag>

                            </div>
                        </div>
                        <div class="right">
                            {{ item.total_sign_days }} 天
                        </div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>


    </div>


</template>

<script lang='ts' setup>

import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import { TabsProps } from 'ant-design-vue/es/tabs';
import { getRankings, getRankingsByCompleteNum, getRankingsByNoCompleteNum, getRankingsBySignDays } from '@/apis/rankings';
import { sunfeiMessage } from '@/utils';
const tabPosition = ref<TabsProps['tabPosition']>('top');
const activeKey = ref('1');
let RankingsData = ref<any>([]) // 总体的完成率排行榜所需数据
let RankingsDataOfCompleteNum = ref<any>([]) // 完成任务量排行榜所需数据
let RankingsDataOfNoCompleteNum = ref<any>([]) // 未完成的任务总量排行榜所需数据
let RankingsDataOftotal_signDays = ref<any>([]) // 总体的签到天数排行榜所需数据

const getData = async () => {
    const res: any = await getRankings()
    if (res.code == 200) {
        RankingsData.value = res.data
        console.log(RankingsData.value);

    } else {
        sunfeiMessage("error", "数据请求异常,请联系负责人")
    }
}
const getDataOfCompleteNum = async () => {
    const res: any = await getRankingsByCompleteNum()
    if (res.code == 200) {
        console.log(res);

        RankingsDataOfCompleteNum.value = res.data
    } else {
        sunfeiMessage("error", "数据请求异常,请联系负责人")
    }
}

const getDataOfNoCompleteNum = async () => {
    const res: any = await getRankingsByNoCompleteNum()
    if (res.code == 200) {
        RankingsDataOfNoCompleteNum.value = res.data
    } else {
        sunfeiMessage("error", "数据请求异常,请联系负责人")
    }
}

const getDateOfTotal_SignDays = async () => {
    const res: any = await getRankingsBySignDays()
    console.log(res);

    if (res.code == 200) {
        RankingsDataOftotal_signDays.value = res.data
    }
}
const getRankColor = (index: number) => {
    switch (index) {
        case 0: return '#FFD700';
        case 1: return '#C0C0C0';
        case 2: return '#B87333';
        default: return 'black';
    }
}
onMounted(() => {
    getData()
    getDataOfCompleteNum()
    getDataOfNoCompleteNum()
    getDateOfTotal_SignDays()
})
</script>

<style lang='scss' scoped>
:deep(.ant-tabs) {
    width: 90%;
}

.rankings {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: .625rem;

    #leaderboard {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;

        .user {
            display: flex;
            justify-content: space-between;
            align-items: end;

            .left {
                display: block;
                width: 10%;
                line-height: 50px;
                // font-weight: bold;
                font-size: 28px;
                margin-right: 10px;
            }

            .middle {
                position: relative;
                width: 50%;
                display: flex;
                gap: 0.25rem;

                img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 5px;
                    margin-right: 15px;
                }
            }



            .right {
                width: 25%;
                font-size: 25px;
                font-weight: 600;
                color: rgb(86, 84, 84);
            }



            .userInfo {
                display: flex;
                flex-direction: column;

                .username {
                    display: block;
                    font-size: 18px;
                    font-weight: 600;
                }

                .Signatures {
                    font-size: 12px;
                    color: rgb(86, 84, 84);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .medals {
                    // 文本溢出隐藏
                    width: 75px !important;
                    border: none;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                }
            }
        }
    }
}

// 媒体响应
@media screen and (max-width: 768px) {
    .left {
        width: 13% !important;
    }

    .middle {
        width: 50% !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    :deep(.ant-tabs-content-holder) {

        overflow: scroll;
        overflow-x: hidden;
    }

    .medals {
        position: static !important;
        padding: 0px;
    }


}
</style>