<template>
    <div class="activity">
        <div class="box">
            <div class="topic">
                <div class="topic_top">
                    <img src="@/assets/svg/topic.svg" alt="" class="svg">
                    <span>活动须知</span>
                </div>
                <div class="notice-content">
                    <p>1. 活动反馈,请联系负责人qq:2770894499 </p>
                    <p>2. 本页面不定期更新新的福利和活动,请持续关注； </p>
                    <p>3. 如果奖品,未及时发放,请联系负责人核实 并进行奖励的补回 </p>
                    <p>4. 现阶段活动,福利多多,欢迎大家参与🥰</p>
                </div>

            </div>
            <div class="card" v-for="item in activityList" :key="item.activity_id">
                <img :src="item.cover_image_url" alt="活动图" class="banner">
                <!-- 下面标题 -->
                <div class="content">
                    <span class="activityName">{{ item.title }}</span>
                    <div style="margin-top: 10px;">
                        <div class="structure">
                            <img src="@/assets/svg/rli.svg" alt="" class="svg">
                            <span class="activityTime">{{ item.start_time }} ~ {{ item.end_time }}</span>
                        </div>

                        <div class="structure">
                            <img src="@/assets/svg/publishPerson.svg" alt="发布人" class="svg">
                            <span class="activityTime">{{ item.publish_name }}</span>
                        </div>
                        <div class="structure">
                            <img src="@/assets/svg/prize.svg" alt="奖品" class="svg">
                            <span class="prize">{{ item.reward }}</span>
                        </div>

                    </div>
                    <button class="btn" @click="getPrize(item.activity_id)">领取奖励</button>
                </div>

            </div>


        </div>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue";
import { getActivityList } from "@/apis/activity/index";
import { getNewUserPrize } from "@/apis/prize";
import { getCurrentUserid } from "@/utils/CurrentUserid";
import { notification } from "ant-design-vue";
import { useUserStore } from "@/store/user/userStore";
const activityList = ref<any>()
const userStore = useUserStore()

const getDataList = async () => {

    const data: any = await getActivityList()
    console.log(data);
    if (data.code == 200) {
        activityList.value = data.data
    }
}
const getPrize = async (activity_id: number) => {
    console.log(activity_id);

    try {
        const res: any = await getNewUserPrize(getCurrentUserid())
        if (res.code == 200) {
            // 同步一下userStore
            // 奖励经验 500分
            userStore.experience += 500
            // 奖励贝壳点 100 贝壳
            userStore.points += 100
            notification.success({
                message: `${res.message},请前往个人中心查看`,
            })
        }
    } catch (error: any) {
        notification.error({
            message: error.detail,
        })
    }




}

onMounted(() => {
    getDataList()
})

</script>

<style lang='scss' scoped>
.activity {
    width: 100%;
    padding: 16px;
    background-color: #f2f3f5;

    .box {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        width: 100%;
        height: 100%;

        .topic {
            padding: 1.667rem;
            width: 100%;

            background-color: #ffffff;

            .topic_top {
                display: flex;
                align-items: center;

                .svg {
                    width: 24px;
                    height: 24px;
                }

                span {
                    margin-left: 1rem;
                    font-size: 1.333rem;
                    line-height: 2rem;
                    font-weight: 500;
                    color: #252933;
                }
            }

            .notice-content {
                // 文本自动换行
                margin-top: 1rem;
                margin-left: 2rem;
                font-size: 1rem;
                line-height: 1.833rem;

                color: #515767;
            }

            p {
                white-space: pre-line;
            }
        }

        .card {
            display: flex;
            flex-direction: column;
            width: 23%;
            height: 335px;
            box-shadow: #333333 0px 10px 20px -10px;
            background-color: #fff;

            transition: all 0.3s;

            &:hover {
                // 盒子阴影
                box-shadow: #333333 0px 0px 10px 0px;
                // 向上位移
                transform: translateY(-3px);
            }

            .banner {
                width: 100%;
                height: 150px;
                object-fit: cover;
            }

            .content {
                display: flex;
                flex-direction: column;
                padding: 20px 12px 15px;

                .activityName {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-size: 14px;
                    font-weight: 800;
                }

                .structure {
                    margin-top: 5px;
                    display: flex;
                    gap: 5px;

                    .svg {
                        width: 1rem;
                    }


                    .prize,
                    .activityTime {
                        font-size: 12px;
                        color: #333333;
                        vertical-align: baseline;
                        word-break: break-word;
                        overflow: hidden;
                        /*超出部分隐藏*/
                        white-space: nowrap;
                        /*禁止换行*/
                        text-overflow: ellipsis;
                        /*省略号*/

                    }
                }






                .btn {
                    margin-top: 10px;
                    width: 100%;
                    height: 35px;
                    font-size: 14px;
                    border-radius: 10px;
                    background-color: #86cbc1;
                    line-height: 25px;
                    color: #ffffff;
                    text-align: center;
                }

            }
        }
    }

}

// 媒体响应
@media screen and (max-width: 768px) {
    .activity .box .card {

        width: 100%
    }

    .notice-content {
        margin-left: 0px !important;
    }

}
</style>