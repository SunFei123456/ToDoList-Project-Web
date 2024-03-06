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
                        <span class="left"># {{ index + 1 }}</span>
                        <div class="middle">
                            <img :src="item.UserAvatar" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.UserName }}</span>
                                <span class="Signatures">
                                    {{ item.introduction }} </span>
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
                        <span class="left"># {{ index + 1 }}</span>
                        <div class="middle">
                            <img :src="item.avatar_url" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.nickName }}</span>
                                <span class="Signatures">
                                    {{ item.Signatures }} </span>
                            </div>
                        </div>
                        <div class="right">
                            {{ item.completeNum }}
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
                        <span class="left"># {{ index + 1 }}</span>
                        <div class="middle">
                            <img :src="item.avatar_url" alt="UserAvatar">
                            <div class="userInfo">
                                <span class="username">{{ item.nickName }}</span>
                                <span class="Signatures">
                                    {{ item.Signatures }} </span>
                            </div>
                        </div>
                        <div class="right">
                            {{ item.no_completeNum }}
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
import { getRankings, getRankingsByCompleteNum,getRankingsByNoCompleteNum } from '@/apis/rankings';
import { sunfeiMessage } from '@/utils';
const tabPosition = ref<TabsProps['tabPosition']>('top');
const activeKey = ref('1');
let RankingsData = ref<any>([])
let RankingsDataOfCompleteNum = ref<any>([])
let RankingsDataOfNoCompleteNum = ref<any>([])

const getData = async () => {
    const res: any = await getRankings()
    if (res.code == 200) {
        RankingsData.value = res.data
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
onMounted(() => {
    getData()
    getDataOfCompleteNum()
    getDataOfNoCompleteNum()
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
            height: 50px;
            border-bottom: 1px solid #1e80ff;
            border-radius: 8px;

            .left {
                display: block;
                width: 10%;
                line-height: 50px;
                font-weight: bold;
                font-size: 28px;
                margin-right: 10px;
            }

            .middle {
                width: 30%;
                display: flex;
                gap: 0.25rem;

                img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 10px;
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

}
</style>