<template>
    <div class="simple-tasks-describe" v-if="hasData">
        <h1>每日事项</h1>
        <a-collapse v-model:activeKey="activeKey" @change="changeActivekey" v-for="(item, index) in array2D" >
            <a-collapse-panel :key="index" :header="timearray[index] + ' 号'" class="item">
                <a-collapse default-active-key="i.id" v-for="i in item">
                    <a-collapse-panel key="i.id" :header="i.title">
                        <p class="approximate-content">{{ i.content }}</p>
                    </a-collapse-panel>
                </a-collapse>
            </a-collapse-panel>
        </a-collapse>
    </div>
    <!-- 没有数据的时候展示这个组件 -->
    <OtherEmpty v-else />
</template>
<script lang="ts" setup>
import { onMounted, ref, } from 'vue';

import OtherEmpty from '@/components/no-data-components/OtherEmpty.vue'

import { getTasks } from '@/apis/task';
import { formatDateTime } from '@/utils';


const owner_id = localStorage.getItem("CurrentUserid");
const activeKey = ref([]);

// 定义一个字段 用来判断页面是否有数据
const hasData = ref(true);





// 定义一个响应式的二维数组
const array2D: any = ref([[]]);
const timearray: any = ref([]);

interface ResponseType {
    code: number;
    message: string;
    data: any;
}

interface Response {
    code: number;
    message: string;
    data: Array<any>;
}
function getData() {


    getTasks(owner_id).then((res: any) => {
        const response: Response = res as ResponseType
        // 如果数组code 是 404 并且数组是[]
        if (response.code === 404 && response.data.length === 0) {
            hasData.value = false
        } else {
            hasData.value = true
            // 进行数据过滤(只拿需要的字段)
            response.data = response.data.map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    create_time: formatDateTime(item.create_time)
                }
            })
            // 根据相同字段 组成二维数组
            const groupedData = response.data.reduce((acc: any, cur: any) => {
                const date = cur.create_time.substring(0, 10);
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(cur);
                return acc;
            }, {});
            array2D.value = Object.values(groupedData).reverse();
            for (let i = 0; i < array2D.value.length; i++) {
                for (let j = 0; j < array2D.value[i].length; j++) {
                    timearray.value.push(array2D.value[i][j].create_time.substring(0, 10))
                }

            }

            // 对数组进行去重
            timearray.value = Array.from(new Set(timearray.value))
        }
    })
}





const changeActivekey = (key: string) => {
    console.log(key);
};


onMounted(() => {
    getData()
})

</script>
  
  
<style lang="scss" scoped>
.simple-tasks-describe {
    padding: 1rem;
}



.item {
    border: none;
    border-radius: 4px;
    margin-bottom: 1rem;
    border: 0;
    overflow: hidden
}
</style>