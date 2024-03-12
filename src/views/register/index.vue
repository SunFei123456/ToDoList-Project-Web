<template>
    <div class="registerBox">

        <a-card title="Register" :bordered="true" style="width: 350px" hoverable>
            <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" placeholder="请输入您的用户名">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
                    <a-input v-model:value="formState.email" placeholder="请输入您的邮箱">
                        <template #prefix>
                            <MailOutlined />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" placeholder="请输入您的密码" autocomplete="off">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item name="againPassword"
                    :rules="[{ required: true, message: 'Please input your password again!' }]">
                    <a-input-password v-model:value="formState.againPassword" placeholder="请再次重复您的密码" autocomplete="off">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>



                <a-form-item>
                    <a-button type="primary" html-type="submit" class="registerBtn">注册</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '@/router';
import { RegisterApi } from '@/apis/user/index'
import { sunfeiMessage } from '@/utils';
import { registerFormState } from '@/interfaces/form/index'





const formState = reactive<registerFormState>({
    username: '',
    email: '',
    password: '',
    againPassword: ''
});
const onFinish = async (values: any) => {
    const data = {
        name: values.username, email: values.email, password: values.password
    }

    // 判断两次密码是否一致
    if (values.password !== values.againPassword) {
        // 处理密码不匹配
        sunfeiMessage('error', '两次密码不一致');
    } else {

        try {
            const res = await RegisterApi(data);

            // 注册成功
            if (res && res.status === 200) {
                sunfeiMessage('success', '注册成功');
                // 路由跳转
                await router.push({ path: '/login' });
                // 使用await确保导航完成后再执行任何进一步的操作
            } else {
                sunfeiMessage('error', '注册失败');
            }
        } catch (error:any) {
            console.error('注册过程中出现错误:', error);
            sunfeiMessage('error', error.detail);
        }
    }


};


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>
  
<style lang="scss" scoped>
.registerBox {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

    .registerBtn {
        width: 100%;
    }

}
</style>