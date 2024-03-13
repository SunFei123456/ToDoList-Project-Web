<template>
    <div class="goodsContent">
        <div class="box">
            <div class="topic">
                <div class="topic_top">
                    <img src="@/assets/svg/topic.svg" alt="" class="svg">
                    <span>公告栏</span>
                </div>
                <div class="notice-content">
                    <p>1. 活动反馈,请联系负责人qq:2770894499 🫣 </p>
                    <p>2. 不定期上新新的商品,请大家持续关注!🧡 </p>
                    <p>3. 如果奖品,未及时发放,请联系负责人核实 并进行奖励的补回🥰 </p>
                    <p>4. 实体奖品一定要凭借校验码联系负责人进行核对,进行奖品的发放🥰</p>
                </div>

            </div>
            <div class="goods">


                <div class="card" v-for="item in goodsList" :key="item.activity_id">
                    <a-skeleton active v-if="!item.goods_image_url"></a-skeleton>
                    <img :src="item.goods_image_url" alt="商品图" class="goods_image" v-else>

                    <div class="content">
                        <span class="goodsName">{{ item.goods_name }}</span>
                        <div style="margin-top: 10px;">
                            <a-tag color="orange">{{ item.goods_tag || "暂无" }}</a-tag>
                            <br>
                            <div class="requirePoints" style="display: flex; justify-content: space-between;">
                                <div>
                                    <img src="@/assets/svg/seashell.svg" alt="" class="svg">
                                    {{ item.goods_require_point }}贝壳
                                </div>
                                <div class="count">
                                   {{ item.goods_number_of_acquire }}人已兑
                                </div>
                            </div>


                        </div>
                        <button class="btn" @click="getPrize(item)">兑换奖品</button>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script lang='ts' setup>
import { h, onMounted, ref } from "vue";

import { notification } from "ant-design-vue";
import { useUserStore } from "@/store/user/userStore";
import { exchangeGoods, getGoodsList } from "@/apis/goods";
import { getCurrentUserid } from "@/utils/CurrentUserid";
import { Modal } from "ant-design-vue";
const success = (message: string) => {
    Modal.success({
        title: '兑换成功',
        content: h('div', {}, [
            h('p', '请凭借此校验码,向管理员进行奖励变现'),
            h('p', message),
        ]),
    });
};


const goodsList = ref<any>()
const userStore = useUserStore()



const getDataList = async () => {

    const res: any = await getGoodsList()
    if (res.code == 200) {
        goodsList.value = res.data

    }
}


/* 

 {
      "goods_name": "0.1元微信红包",
      "goods_image_url": "http://localhost:8080/uploads/redpacket.webp",
      "goods_tag": "实体奖励",
      "id": 1,
      "goods_require_point": 100,
      "goods_number_of_acquire": 0
    },
*/
interface Item {
    goods_name: string
    goods_image_url: string
    goods_tag: string
    id: number
    goods_require_point: number
    goods_number_of_acquire: number
}

const getPrize = async (item: Item) => {
    console.log(item.id);
    try {
        const res: any = await exchangeGoods(getCurrentUserid(), item.id)
        userStore.points -= item.goods_require_point
        if (res.code == 200) {
            success(res.verification_code)
        } else {
            notification.error({
                message: res.detail,
                duration: 1.5
            })
        }
    } catch (error: any) {
        notification.error({
            message: error.detail,
            duration: 1.5
        })
    }



}







onMounted(() => {
    getDataList()

})

</script>

<style lang='scss' scoped>
.goodsContent {
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

        .goods {
            display: flex;
            gap: .5rem;
            flex-wrap: wrap;
            width: 100%;
            justify-content: space-between;

            .card {
                display: flex;
                flex-direction: column;
                width: 24%;
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

                .goods_image {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-bottom: 1px solid #e6eb;
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    padding: 22px 12px 15px;

                    .goodsName {
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .requirePoints {
                        margin-top: 16px;
                        display: flex;
                        gap: 5px;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 24px;
                        color: #1e80ff;
                        flex: auto;
                        display: flex;
                        align-items: center;

                        .svg {
                            width: 1.2rem;
                        }

                        .count {
                            font-size: 12px;
                            line-height: 20px;
                            margin-left: 12px;
                            color: #8a919f;
                        }
                    }

                    .btn {
                        border-top: 1px solid #e4e6eb;
                        margin-top: 15px;
                        width: 100%;
                        height: 35px;
                        font-size: 14px;
                        border-radius: 10px;
                        background-color: #0754ed;
                        line-height: 25px;
                        color: #ffffff;
                        text-align: center;
                    }

                }
            }
        }


    }

}

// 媒体响应
@media screen and (max-width: 768px) {
    .goods {
        justify-content: space-between;
    }

    .goodsContent .box .card {

        width: 48% !important;
        height: 300px;
    }

    .notice-content {
        margin-left: 0px !important;
    }

}
</style>