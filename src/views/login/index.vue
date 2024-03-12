<template>
    <div class="contain">
        <div class="main">
            <div class="login">
                <!-- 标题 -->
                <h2 class="title">LOGIN</h2>
                <div class="welcome">Welcome The ToDoList</div>

                <a-form :model="formState" name="basic" @finish="onFinish" @finishFailed="onFinishFailed">
                    <a-form-item name="email" :rules="[{ required: true, message: '请输入您的邮箱账号' }]">
                        <a-input v-model:value="formState.email" placeholder="请输入您的邮箱">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码' }]">
                        <a-input-password v-model:value="formState.password" placeholder="请输入您的密码" autocomplete="off">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>

                        </a-input-password>
                    </a-form-item>
                    <a-form-item name="verifyCode">
                        <div class="verify">
                            <input v-model="verifyCode" placeholder="验证码" class="verifyInput" />
                            <VerifyImage ref="verifyRef" />
                        </div>
                    </a-form-item>

                    <!-- 记住密码 和 前往注册 -->
                    <div class="rememberAndregister">
                        <a-radio v-model:checked="checked">记住我</a-radio>
                        <p>没有账号? <router-link to="/register">前往注册</router-link> </p>
                    </div>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="btn">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { setCurrentUseridn } from '@/utils/CurrentUserid'
import { sunfeiMessage } from '@/utils'
import { LoginApi } from '@/apis/user'
import { loginFormState } from '@/interfaces/form/index'
import router from '@/router';
import { useUserStore } from '@/store/user/userStore';
import VerifyImage from '@/components/verify/index.vue'


const userStore = useUserStore()

const verifyRef = ref<any>(null);

const checked = ref<boolean>(false)
const formState = reactive<loginFormState>({
    email: '',
    password: '',
});

const verifyCode = ref<string>('')




const onFinish = async (values: any) => {
    const imgCode = verifyRef.value.exposedState.imgCode
    if (values.email === '' || values.password === '' || verifyCode.value === '') {
        sunfeiMessage('error', '邮箱或密码,验证码不可以为空')
    } else {
        if (checked.value === false) {
            sunfeiMessage('error', '请勾选记住我')
        } else {
            // 进行验证码校验
            // 两边统一进行转换为大写 然后进行判断
            const userInputVerifyCode = verifyCode.value.toLocaleUpperCase()
            const generatedVerifyCode = imgCode.value.toLocaleUpperCase()
   
            if (userInputVerifyCode !== generatedVerifyCode) {
               
                sunfeiMessage('error', '验证码不正确')
                // 如果验证码不正确 重新绘制验证
                verifyRef.value.handleDraw()
                // 将输入的验证码清空
                verifyCode.value =''
            } else {
                try {
                    // 调取接口,进行登录
                    const res = await LoginApi(values)
                    // 本地存储用户id字段
                    setCurrentUseridn(res.data.id)
                    // store中存储用户信息
                    await userStore.getUserInfoHandle(res.data.id)
                    // 提醒
                    sunfeiMessage(`success`, '登录成功,正在前往首页')
                    // 路由跳转
                    router.push({ path: '/home' })
                } catch (error:any) {
                    sunfeiMessage('error', error?.detail)
                }

            }

        }
    }

};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};


// 
</script>
  

<style lang="scss" scoped>
.contain {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

    .main {
        padding: 16px;

        .login {
            width: 350px;
            height: auto;
            display: flex;
            flex-direction: column;
            padding: 10px;
            // 毛玻璃效果
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 8px;

            .title {
                margin: 0;

            }

            .welcome {
                font-size: 13px;
                color: rgba(122, 122, 122, 0.968);
                margin-bottom: 20px;
            }

            .rememberAndregister {
                display: flex;
                justify-content: space-between;
            }

            .btn {
                width: 100%;
                height: 40px;
                border: none;
                color: #ffffff;
                background-color: #343434;


                transition: all 0.23s ease-in-out;

                &:hover {
                    // 添加阴影效果
                    box-shadow: 0 2px 2px 0 rgb(0, 0, 0), 0 3px 1px rgb(0, 0, 0), 0 1px 5px 0 rgb(0, 0, 0);

                }
            }

            .ant-form {
                padding: 16px;
            }
        }


    }
}

.verify {
    display: flex;
    justify-content: space-between;

    .verifyInput {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #6e6e6e;
        /* 设置底部边线样式 */
        outline: none;

        /* 移除默认的输入框轮廓 */
        &:focus {
            outline: none;
            box-shadow: none
        }
    }
}
</style>
