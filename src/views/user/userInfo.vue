<template>
    <div class="main ">
        <div class="card">
            <div class="headPanel">
                <!-- 设置默认显示头像 -->
                <UploadAvatar></UploadAvatar>
                <!-- 用户成长资料展示 -->
                <div class="account_Level__Panel">
                    <div class="box">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <img src="@/assets/svg/level.svg" class="svg" alt="level">
                            <span class="tags">等级</span>
                        </div>

                        <span class="data">Lv {{ userInfo.level || 100 }} </span>

                    </div>

                    <div class="box">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <img src="@/assets/svg/experience.svg" class="svg" alt="experience">
                            <span class="tags">经验点</span>
                        </div>
                        <span class="data">{{ userInfo.experience }} </span>
                    </div>
                    <div class="box">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <img src="@/assets/svg/seashell.svg" class="svg" alt="seashell">
                            <span class="tags">贝壳点</span>
                        </div>
                        <span class="data"> {{ userInfo.points }}</span>
                    </div>
                    <div class="box">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <img src="@/assets/svg/epithet.svg" class="svg" alt="epithet">
                            <span class="tags">称号</span>
                        </div>
                        <span class="data"> {{ epithet }}</span>
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

            <!-- 操作按钮组 -->
            <div class="operation">
                <button id='submit-button' class="commoneStyleForbtn" @click="updateUserInfo()">提交修改</button>
                <button id='recover-button' class="commoneStyleForbtn" @click="getRandomSentence()">随机激励语</button>
            </div>

        </div>

    </div>
</template>


<script setup lang="ts">
import { updateUserInfoApi } from '@/apis/user';
import { useUserStore } from '@/store/user/userStore';
import { getCurrentUserid } from '@/utils/CurrentUserid';
import UploadAvatar from "@/components/uploadImg/index.vue";
import { sunfeiMessage } from '@/utils';
import { notification } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';


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
    // 个签不能查过28个字符
    if (data.introduction.length > 28) {
        sunfeiMessage('error', "个性签名不能超过28个字符");
    } else {
        const res: any = await updateUserInfoApi(getCurrentUserid(), data)

        if (res.code == 200) {
            sunfeiMessage('success', "个人信息修改成功");
        } else {
            sunfeiMessage('error', "个人信息修改失败");
        }
    }

}


// 随机首页激励语
const getRandomSentence = async () => {
    const url = import.meta.env.VITE_SERVER_URL + "/get_sentiment"
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json()
        console.log(data);
        if (data.code === 200) {
            userInfo.HomeMotivationalWords = data.sentiment
            notification.success({
                message: '随机激励语',
                description: data.msg
            })
        }

    } else {
        sunfeiMessage('error', "随机激励语获取失败");
    }



}

const epithet = ref<string>('')
function getLevelTitle(experience: number) {
    if (experience < 500) {
        return '自律小白者';
    } else if (experience < 1000) {
        return '自律成长者';
    } else if (experience < 1700) {
        return '持续进步者';
    } else if (experience < 2800) {
        return '稳步前行者';
    } else if (experience < 4400) {
        return '自我挑战者';
    } else if (experience < 6800) {
        return '自律达人';
    } else if (experience < 9800) {
        return '模范执行者';
    } else if (experience < 13000) {
        return '高效自律者';
    } else if (experience < 16000) {
        return '自我超越者';
    } else {
        return '自律宗师';
    }
}

// function getLevel(experience: number) {
//     if (experience < 500) {
//         return '1';
//     } else if (experience < 1000) {
//         return '2';
//     } else if (experience < 1700) {
//         return '3';
//     } else if (experience < 2800) {
//         return '4';
//     } else if (experience < 4400) {
//         return '5';
//     } else if (experience < 6800) {
//         return '6';
//     } else if (experience < 9800) {
//         return '7';
//     } else if (experience < 13000) {
//         return '8';
//     } else if (experience < 16000) {
//         return '9';
//     } else {
//         return '10';
//     }
// }
// // 使用 watch 函数监听 userInfo.experience 的变化
// // 需要变化的数据包括 =>. level  和  epithet
watch(() => userInfo.experience, (newExperience) => {
    epithet.value = getLevelTitle(newExperience);
});

onMounted(() => {
    epithet.value = getLevelTitle(userInfo.experience)
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
        // 盒阴影


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
                    padding: 14px 8px;
                    // background: #C9D6FF;  /* fallback for old browsers */
                    // background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
                    // background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


                    width: 150px;
                    height: -webkit-fit-content;
                    height: -moz-fit-content;
                    height: fit-content;
                    border-radius: 5px;
                    box-shadow: 0px 3px 20px -6px rgba(0, 0, 0, 0.3);

                    .svg {
                        width: 25px;
                        height: 25px;
                    }

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
                    font-weight: 600;


                }

                #email {
                    color: #262626bf;
                    border-style: dotted;
                }

                input {
                    width: 250px;
                    height: 2.5rem;
                    padding-left: .75rem;
                    border-style: none;
                    border-radius: .375rem;
                    color: #000000;
                    background-color: #ecebebaa;
                    ;
                    outline: 2px solid #0000;

                    outline-offset: 2px;
                    transition: outline 0.3s ease;

                    &:focus {
                        outline: 2px solid #51c9ff; //边框不用border，用outline
                        color: #000000;
                    }
                }

                textarea {
                    height: 150px;
                    padding: 0.625rem;
                    border-radius: 0.375rem;
                    border: none;
                    color: #000000;
                    background-color: #ecebebaa;
                    outline: 2px solid #0000;
                    outline-offset: 2px;
                    transition: outline 0.3s ease;

                    &:focus {
                        outline: 2px solid #51c9ff; //边框不用border，用outline

                    }
                }
            }

        }

        .operation {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;
            justify-content: space-between;

            .commoneStyleForbtn {
                width: 40%;
                height: 3rem;
                border-radius: 10px;
                color: #000000;
                transition: all 0.25s linear;
            }

            #submit-button {
                background-color: #00FFD7;

                &:hover {
                    box-shadow: 0 0 10px #000000;
                }
            }

            #recover-button {
                background-color: #18FF9B;

                &:hover {
                    box-shadow: 0 0 10px #000000;
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