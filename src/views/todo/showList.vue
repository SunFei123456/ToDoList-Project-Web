<template>
    <div>
    <a-modal title="提示" :visible.sync="modalVisible" :centered=centered footer="" width="40%" :maskClosable="false"
        @close="handleClose">
        {{ pointObj.message }}
    </a-modal>
    <NoLogiShowCard v-if="isShowNotLogin" />
    <div class="main" v-else="isShowNotLogin">
        <Empty v-if="!hasData" />

        <div class="card-group" v-else="hasData">
            <div class="task-card" v-for="(item, index) in tasks" :key="index">
                <!-- 右上角徽章(这里主要显示类型 和 权重) -->
                <!-- 后期这里需要修改,就是根据权重和类型显示不同的颜色 !!! 2023/10/26/ 23:11 by 孙飞 -->
                <a-badge-ribbon :text="[item.category]" type="success" :color="ribbonColor(item.category)">
                    <!-- 任务卡片 循环 -->
                    <a-card :title="item.createdTime">
                        <span class="delete" @click="deleteTask(item.id, index)">
                            <Icon color="#49271D" size="20">
                                <TrashBinOutline></TrashBinOutline>
                            </Icon>
                        </span>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }">
                            <strong>任务标题:</strong>{{ item.title }}- {{ item.id }}
                        </p>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }"><strong>任务大概:</strong>
                        </p>
                        <p class="approximate-content" :style="{ textDecoration: status[index] ? 'line-through' : 'none' }">
                            {{ item.summary }}</p>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }"><strong>任务优先级:</strong>
                            {{
                                item.priority }}</p>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }"><strong>任务完成状态 ->
                            </strong>
                            <span class="Done" v-if="status[index]">已完成</span>
                            <span class="NoDone" v-else="status[index]">未完成</span>
                        </p>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }"><strong>任务类别:</strong>
                            {{
                                item.category }}</p>
                        <p :style="{ textDecoration: status[index] ? 'line-through' : 'none' }"><strong>任务创建时间:</strong>
                            {{
                                item.createdTime }}</p>
                        <div style="display: flex; gap: 1rem;">
                            <button :class="status[index] ? 'sf-button sf-btn-success' : 'sf-button sf-btn-submit'"
                                @click="changeListStatus(item.id, index)" :disabled="status[index]">{{ status[index] ?
                                    '已完成'
                                    : '提交确认' }}</button>

                            <button @click="recoverTask(item.id, index)" class="sf-button sf-btn-danger">撤回</button>
                        </div>
                    </a-card>
                </a-badge-ribbon>
            </div>
        </div>

        <!-- 页面左下角 添加任务 弹出抽屉 -->
        <a-button type="primary" @click="changeOpenStatus()" class="ShowAddList">
            <template #icon>
                <plus-square-filled />
            </template>
        </a-button>

        <!-- 抽屉组件 -->
        <a-drawer title="抽屉标题" :visible="isOpen" @close="changeOpenStatus()">
            <a-card title="添加任务" class="card card-shadow task-card">
                <a-form :model="JobFormData" name="basic" layout="vertical" @finish="onFinish">
                    <a-form-item label="标题" name="title" :rules="[{ required: true, message: 'Please input your title!' }]">
                        <a-input v-model:value="JobFormData.title" />
                    </a-form-item>

                    <a-form-item label="内容" name="content"
                        :rules="[{ required: true, message: 'Please input your content!' }]">
                        <a-textarea v-model:value="JobFormData.content" show-count :maxlength="500" />
                    </a-form-item>

                    <a-form-item label="权重" name="weight">
                        <a-radio-group v-model:value="JobFormData.weight" size="large">
                            <a-radio-button value="1">重要</a-radio-button>
                            <a-radio-button value="2">一般</a-radio-button>
                            <a-radio-button value="3">不重要</a-radio-button>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item label="状态" name="status" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-radio-group v-model:value="JobFormData.status">
                            <a-radio :value="true">True</a-radio>
                            <a-radio :value="false">False</a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item label="类型" name="type">
                        <a-radio-group v-model:value="JobFormData.type" size="large">
                            <a-radio-button value="Work[工作]">工作</a-radio-button>
                            <a-radio-button value="Study[学习]">学习</a-radio-button>
                            <a-radio-button value="Life[生活]">生活</a-radio-button>
                        </a-radio-group>
                    </a-form-item>

                    <div style="display: flex; justify-content: space-between; gap: 2rem;">
                        <button style="background-color: dodgerblue; width: 5rem;height: 2rem;">提交</button>
                        <button style="background-color: #e99c30; width: 5rem;height: 2rem;" @click="resetForm">重置</button>
                    </div>
                </a-form>
            </a-card>
        </a-drawer>
    </div>
</div>
</template>
  
<script lang="ts" setup>

import { onMounted, reactive, ref, createVNode, watch, toRefs } from 'vue';
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons-vue'
//  添加任务, 删除任务, 更新任务状态,查询任务列表
import { AddTask, DelTask, UpdataTasksStatus, getTasks } from '@/apis/task/index'
// 格式化时间
import { formatDateTime } from '@/utils/index'
import NoLogiShowCard from '../../components/NoLoginShowCard.vue'
import Empty from '@/components/no-data-components/index.vue'
import { useStore } from '../../store/index';
import { TrashBinOutline } from "@vicons/ionicons5";
import { Icon } from '@vicons/utils' // vue3
import { storeToRefs } from 'pinia'
import { notification, Modal } from "ant-design-vue";

// 引入NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入类型接口
import { JobFormType, ErrorType, TaskType } from '@/interfaces/tasks'

const SFstore = useStore()

console.log(SFstore.color);

// const tasks_cards_style = ref<string>(
//     `background-color: ${SFstore.color};`
// )

const { isOpen } = storeToRefs(SFstore)
const { changeOpenStatus } = SFstore

const isShowNotLogin = ref<boolean>(false);
const IsError = ref<boolean>(false);
// 是否该用户已经有数据
const hasData = ref<boolean>(false)


//  创建任务表单数据
const JobFormData = reactive<JobFormType>({
    title: '',
    content: '',
    weight: "",
    status: false,
    type: ""
});

const centered = true
// 按照时间查询
// const searchTime = ref<string>("")
// 任务列表 用来接收后端api返回的数据
const tasks = reactive<TaskType[]>([])
// 快速响应前端样式变化
const status = reactive<boolean[]>([])

const userid = localStorage.getItem("CurrentUserid")

const modalVisible = ref<boolean>()

const pointObj = ref<any>({})

console.log(tasks);


// 关闭弹框
function handleClose() {
    modalVisible.value = false
}
// vue3监听请求回来数据变化 
// 是否有任务,一个任务也没展示empty页面
watch(tasks, (newVal) => {
    // 没有值,用户没有创建第一个待办事项
    if (newVal.length == 0) {
        hasData.value = false
    } else {
        // 有值,说明用户已经创建了待办事项
        hasData.value = true
    }
})



// 增加积分值请求接口
function increasePoint(url: string, userid: any) {
    fetch(`${url}${userid}`, {
        method: 'PUT'
    }).then((response) => {
        console.log("Response:", response.json);
    }).then((data) => {
        console.log("Data:", data);
    })
}


// 1. 增加任务,同步数据库
function SendData(values: any) {
    const userid = localStorage.getItem("CurrentUserid")
    const data = {
        title: values.title,
        content: values.content,
        weight: values.weight,
        status: values.status,
        category: values.type
    }
    AddTask(userid, data)
        .then(response => {
            if ((response as any).code == 200) {
                notification.success({
                    message: `创建成功!`,
                    description: "任务创建成功,页面正在请求",
                    duration: 1.25,
                    onClick: () => {
                    },
                });
            }
        })
        .catch((error: ErrorType) => {
            // 处理错误
            console.error(error);
        });
    increasePoint("http://127.0.0.1:8000/user/makeTask/increasePoint/", userid)
}

// 2. 删除任务,删除数据库表列
const deleteTask = (id: number, index: number) => {
    // 进行进一步确认 弹出对话框(请求用户是否要删除任务)
    Modal.confirm({
        centered: true,
        title: "是否要删除任务？",
        icon: createVNode(ExclamationCircleOutlined),
        confirmLoading: true,
        okText: "确认",
        cancelText: "取消",
        async onOk() {
            try {
                sendDelrequest(id)
                // 删除指定的元素
                tasks.splice(index, 1)
                toRefs(tasks); // 通知Vue进行更新
                // 然后再进行反转一下 到达倒序

            } catch {
                return console.error("Oops errors!");
            }
        },
        onCancel() {
            console.log("点击了取消");
        },
    })
}
// 3. 完成任务,修改状态(数据库操作) &&  完成任务, 及时反馈(客户端操作 障眼法)
const changeListStatus = (id: number, index: number) => {
    // 进行进一步确认 弹出对话框(二次请求用户是否已经完成任务)
    Modal.confirm({
        centered: true,
        title: "请确认是否已经完成了该项任务",
        icon: createVNode(ExclamationCircleOutlined),
        content: "不要欺骗自己,请完成任务之后再进行任务的提交哦",
        okText: "提交",
        cancelText: "取消",
        confirmLoading: true,
        async onOk() {
            try {
                // 模拟请求 加载loading
                await sendPutrequest(id)
                status[index] = true

                // 进行加分
                // 请求接口 fetch . put的请求

                fetch(`http://127.0.0.1:8000/user/completeTask/increasePoint/${userid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        pointObj.value = data.data
                    }).then(function () {
                        modalVisible.value = true
                        setTimeout(() => {
                            modalVisible.value = false
                        }, 2000)
                    }
                    )
                    .catch(error => {
                        console.error('Error:', error);
                    });



            } catch {
                return console.error("Oops errors!");
            }
        },
        onCancel() {
            // console.log("点击了取消");

        },
    });
}

// 3. 恢复任务,修改数据库
const recoverTask = (id: number, index: number) => {
    // 进行进一步确认 弹出对话框(请求用户是否要恢复任务)
    Modal.confirm({
        centered: true,
        title: "是否要恢复任务？",
        icon: createVNode(ExclamationCircleOutlined),
        confirmLoading: true,
        okText: "确认",
        cancelText: "取消",
        async onOk() {
            try {
                sendPutrequest(id)
                status[index] = false
                fetch(`http://127.0.0.1:8000/user/cancelTask/decreasePoint/${userid}`, {
                    method: 'PUT',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
            } catch {
                return console.error("Oops errors!");
            }
        },
        onCancel() {
            // console.log("点击了取消");
        },
    });

}


function ribbonColor(data: any) {
    if (data == "Work[工作]") {
        return "red"
    }
    if (data == "Study[学习]") {
        return "blue"
    }
    if (data as any == "Life[生活]") {
        return "green"
    }
}

// 4. 查询任务,查询数据库
async function fetchDataById() {
    try {
        // 下一次请求前,进行原数组的清空处理
        tasks.length = 0
        status.length = 0
        const owneId = localStorage.getItem("CurrentUserid");
        if (owneId) {
            const res: any = await getTasks(owneId)

            if (res?.code == 200) {
                const data = (res.data);
                for (let i = 0; i < data.length; i++) {
                    tasks.push({
                        id: data[i].id,
                        title: data[i].title,
                        summary: data[i].content,
                        priority: data[i].weight,
                        category: data[i].category,
                        createdTime: formatDateTime(data[i].create_time)
                    })
                    // 顺序添加
                    status.unshift(data[i].status)
                    // 对里面所有的值进行取反
                }
                tasks.reverse()
            }
        } else {
            // 展示引导登录页面
            isShowNotLogin.value = true
        }
    } catch (error) {
        console.log(error);
        IsError.value = true
    }
}



// main(修改) : 发送请求,修改数据库,更新任务的完成状态(完成任务)
const sendPutrequest = async (id: number) => {
    const owneId = localStorage.getItem("CurrentUserid");
    // 进行进一步确认 弹出对话框(二次请求用户是否已经完成任务)
    try {
        const response = await UpdataTasksStatus(owneId, id)
        // 处理响应数据
        console.log("更新操作:", response);
    } catch (error) {
        throw error
        // 处理错误信息
    }
}

// main(删除) : 发送请求,删除数据库表列
const sendDelrequest = async (id: number) => {
    const owneId = localStorage.getItem("CurrentUserid");
    NProgress.start()
    // 进行进一步确认 弹出对话框(二次请求用户是否已经完成任务)
    try {
        const res: any = await DelTask(owneId, id)
        // 处理响应数据
        console.log("删除操作:", res);
        if (res?.code == 200) {
            notification.success({
                message: `删除成功!`,
                onClick: () => {
                    console.log("无");
                },
            });
        } else {
            notification.error({
                message: `删除失败,请重试!`,
                duration: 1.25, // 1.25s秒自动关闭
                icon: createVNode(Icon, {
                    type: "close-circle",
                    style: {
                        color: "red",
                    },
                }),
                onClick: () => {
                    console.log("无");
                },
            });
        }

    } catch (error) {
        throw error
        // 处理错误信息
    }
    setTimeout(() => {
        NProgress.done()
    }, 800)

}

// main(添加) : 发送请求,添加任务,向数据库表插入数据
const onFinish = (values: any) => {
    NProgress.start()
    // 发送请求,传递数据
    SendData(values)
    setTimeout(() => {
        // 获取最新数据
        fetchDataById()
        // 关闭抽屉
        changeOpenStatus()
    }, 800)
    NProgress.done()
}




// 过滤查询(客户端操作)
// const filteredTasks = computed(() => {
//     // 反转数组
//     tasks.reverse()
//     return tasks.filter(item => item.createdTime.includes(searchTime.value))
// })
// 重置表单
const resetForm = () => {
    JobFormData.title = '',
        JobFormData.content = '',
        JobFormData.weight = "",
        JobFormData.status = false,
        JobFormData.type = ""
}



//  页面dom元素挂载完毕,获取数据
onMounted(() => {
    fetchDataById()
})
</script>
  
<style  lang="scss" scoped>
.main {
    padding: 1rem;
    height: auto !important;

    // 添加任务按钮的样式
    .ShowAddList {
        width: 50px;
        height: 50px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #00A9CE;
    }

    // 卡片的样式
    .card-group {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .task-card {
            position: relative;
            width: 100%;
            // margin: 0 auto;
            border-radius: 10px;
            background-color: rgb(244, 246, 248);
            border: 1px solid rgba(186, 184, 184, 0.137);

            &:hover {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease-out;
            }

            // 完成 or 未完成 标签样式

            .NoDone,
            .Done {
                display: inline-block;
                height: 25px;
                padding: 5px;
                border-radius: 6px;
                line-height: 100%;
                font-size: 12px;
                color: #fff;
                background-color: #FF7500;
            }

            .Done {
                background-color: #08d646c7;
            }

            .ant-radio-button-wrapper {
                margin: 0 6px;
            }


            p {
                color: #333;
            }

            p strong {
                color: #000;
            }

        }
    }

    // 删除任务 (这里主要设置位置)
    .delete {
        position: absolute;
        top: 3.75rem;
        right: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }


    // 抽屉组件里面的提交 和 重置按钮(样式)




}

.ant-drawer-content-wrapper {
    width: 460px !important;
}

.ant-card-bordered {
    border: none !important;
}
</style>
