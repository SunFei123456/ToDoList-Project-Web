<template>
    <a-upload v-model:file-list="fileList" name="avatar_file" list-type="picture-card" class="avatar-uploader"
        :max-count="1" :show-upload-list="false" action="http://127.0.0.1:8080/uploadImage"
        :before-upload="beforeUpload" @change="handleChange">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="avatar" />
        <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">上传头像</div>
        </div>
    </a-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

import { useUserStore } from '@/store/user/userStore';
import { bindUserOfavatar } from '@/apis/pictureApi';

import { sunfeiMessage } from '@/utils';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const userInfo = useUserStore()
imageUrl.value = userInfo.avatar_url


const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // 获取服务器刚刚上传返回的url的地址
        getBase64(info.file.originFileObj, (base64Url: string) => {
            // 将base64Url赋值给imageUrl
            imageUrl.value = base64Url;
            // 获取刚刚上传图片返回的url地址
            const url: string = info.file.response.data;
            // 进行当前用户的头像绑定
            bindUserOfavatar(userInfo.owner.id, url).then((res: any) => {
                if (res.code == 200) {
                    // 进行userInfo Store 的 avatar_url 赋值
                    userInfo.avatar_url = url
                    sunfeiMessage('success', res.message);
                } else {
                    sunfeiMessage('error', "上传头像失败");
                }
            }).catch((err: any) => {
                sunfeiMessage('error', err);
            }).finally(() => {
                loading.value = false;
            })

        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
};

const beforeUpload = (file: any['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


</script>

<style scoped>
/* :deep(.ant-upload.ant-upload-select-picture-card) {
    border-radius: 50% !important;
} */



.ant-upload-picture-card-wrapper {
    width: auto !important;
}

.avatar {
    display: block;
    width: 100px;
    height: 100px;
    border: 2px rgb(255, 255, 255) solid;
    box-shadow: #272727 0px 5px 15px;
    border-radius: 20px;
    object-fit: cover;
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>