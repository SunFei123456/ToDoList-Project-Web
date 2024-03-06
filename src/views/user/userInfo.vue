<template>
    <div class="main ">
        <div class="card">
            <div class="headPanel">
                <!-- 设置默认显示头像 -->
                <UploadAvatar></UploadAvatar>
                <!-- 用户成长资料展示 -->
                <div class="account_Level__Panel">
                    <div class="box">
                        <span class="tags">等级</span> <span class="data">{{ userInfo.level || 100 }} Lv</span>
                    </div>

                    <div class="box">
                        <span class="tags">经验点</span> <span class="data">{{ userInfo.experience }} </span>
                    </div>
                    <div class="box">
                        <span class="tags">贝壳点</span> <span class="data"> {{ userInfo.points }}</span>
                    </div>
                    <div class="box">
                        <span class="tags">称号</span> <span class="data"> {{ userInfo.epithet || '大神' }}</span>
                    </div>
                </div>

            </div>
            <br />
            <div class="form">
                <form action="" method="get">
                    <!-- 用户名 -->
                    <div class="item">
                        <div style="display: flex; flex-wrap: wrap; ">
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="username">用户名</label>
                                <input type="text" name="username" placeholder="必填项" v-model="userInfo.owner.name">
                            </div>
                        </div>
                    </div>

                    <!-- 性别 -->
                    <div style="display: flex;flex-direction: column; gap:0.5rem;">
                        <div style="display: flex; flex-wrap: wrap; gap:1.7rem;">
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="gender">性别</label>
                                <a-select ref="select" v-model:value="userInfo.gender" style="width: 120px" size="large"
                                    @change="handleChange">
                                    <a-select-option value="男">男</a-select-option>
                                    <a-select-option value="女">女</a-select-option>
                                    <a-select-option value="保密">保密</a-select-option>
                                </a-select>
                            </div>

                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="age">年龄</label>
                                <a-input-number v-model:value="userInfo.age" size="large" :min="1" :max="100" />
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div style="display: flex; flex-wrap: wrap; gap:1.7rem;">
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="email">邮箱账号</label>
                                <input type="text" id="email" name="email" placeholder="必填项"
                                    :value="userInfo.owner.email" :disabled="true">
                            </div>
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="email">手机号</label>
                                <input type="text" id="email" name="email" placeholder="必填项" :value="userInfo.phone"
                                    :disabled="true">
                            </div>
                        </div>
                    </div>


                    <!-- 年龄 -->
                    <div class="item">
                        <div style="display: flex;flex-direction: column; gap:0.5rem;">
                            <label for="hobbies">爱好</label>
                            <input type="text" id="hobbies" name="hobbies" placeholder="可选项" v-model="userInfo.hobbies">
                        </div>
                    </div>

                    <!-- 个人介绍 -->
                    <div class="item">
                        <div style="display: flex;flex-direction: column; gap: 1.7rem; ">
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="content">个人介绍</label>
                                <textarea name="content" id="content" v-model="userInfo.introduction"
                                    placeholder="可选"></textarea>
                            </div>
                            <div style="display: flex;flex-direction: column; gap:0.5rem; ">
                                <label for="content">首页激励语配置</label>
                                <textarea name="content" id="content" v-model="userInfo.HomeMotivationalWords"
                                    placeholder="可选"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <button id='succeed-button' @click="updateUserInfo()" style="width: 40%; height: 3rem">提交修改</button>
        </div>

    </div>
</template>


<script setup lang="ts">
import { updateUserInfoApi } from '@/apis/user';
import { useUserStore } from '@/store/user/userStore';
import { getCurrentUserid } from '@/utils/CurrentUserid';
import UploadAvatar from "@/components/uploadImg/index.vue";
import { onMounted } from 'vue'
import { sunfeiMessage } from '@/utils';



const userInfo = useUserStore()



const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

// 更新个人信息
const updateUserInfo = async () => {
    const data = {
        name: userInfo.owner.name, // 昵称
        age: userInfo.age, // 年龄
        gender: userInfo.gender, // 性别
        hobbies: userInfo.hobbies, // 习惯
        HomeMotivationalWords: userInfo.HomeMotivationalWords, // 首页激励语
        introduction: userInfo.introduction, // 个签
    }
    const res: any = await updateUserInfoApi(getCurrentUserid(), data)
    console.log(res);

    if (res.code == 200) {
        sunfeiMessage('success', "个人信息修改成功");
    } else {
        sunfeiMessage('error', "个人信息修改失败");
    }
}


onMounted(() => {

})

</script>

<style lang="scss" scoped>
.ant-picker {
    width: 200px !important;
}

.main {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem;

    .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1rem;
        background-color: #ffffff;

        .headPanel {
            display: flex;
            justify-content: space-between;
            gap: 8px;


            .account_Level__Panel {
                display: flex;
                justify-content: space-between;
                align-items: end;
                gap: 1rem;
                width: 50%;
                height: 100%;

                .box {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: 16px 20px;
                    background: #f7f8fa;
                    width: 150px;
                    height: -webkit-fit-content;
                    height: -moz-fit-content;
                    height: fit-content;

                    border-radius: 2px;

                    .tags {
                        font-size: 14px;
                        color: #4e5969;
                    }

                    .data {
                        color: #1d2129;
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 42px;
                        margin-bottom: 4px;
                        white-space: nowrap;
                    }
                }

            }

        }

        .form {

            form {
                display: flex;
                flex-direction: column;
                gap: 1.7rem;
                margin: 10px 0px;
            }

            .item {
                display: flex;

                flex-direction: column;
                flex-wrap: wrap;

                label {
                    font-size: .875rem;


                }

                input {
                    width: 250px;
                    height: 2.5rem;
                    padding-left: .75rem;
                    border-style: none;
                    border-radius: .375rem;
                    color: #262626bf;
                    background-color: #00000008;
                    outline: 2px solid #0000;

                    outline-offset: 2px;
                    transition: outline 0.3s ease;

                    &:focus {
                        outline: 2px solid #51c9ff; //边框不用border，用outline
                        // background: rgba(3, 16, 28, 0); //背景色
                        color: #000000;
                    }
                }

                textarea {
                    height: 150px;
                    padding: 0.625rem;
                }
            }

        }

    }
}

// 媒体响应
@media screen and (max-width: 768px) {
    .headPanel {
        flex-direction: column;

        .account_Level__Panel {
            width: 100% !important;
            flex-wrap: wrap;
        }
    }
}
</style>