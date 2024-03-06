<template>
    <div class="DataMetrics-Page">


        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- 数据指标 -->
            <div class="DataMetrics">
                <a-row class="indice">

                    <a-col :span="6">
                        <div style="display: flex;flex-direction: column;">
                            <span style="font-size: 14px; color: rgba(57, 57, 57, 0.479);margin-bottom: 5px;">已制定</span>
                            <count-to :start-val="0" :end-val="getlen" :duration="1000"
                                style="font-size: 25px; "></count-to>
                            <div class="line"></div>
                        </div>

                    </a-col>
                    <a-col :span="6">
                        <div style="display: flex;flex-direction: column;">
                            <span style="font-size: 14px; color: rgba(57, 57, 57, 0.479);margin-bottom: 5px;">已完成</span>
                            <count-to :start-val="0" :end-val="getDone" :duration="1000"
                                style="font-size: 25px;"></count-to>
                            <div class="line line-green"></div>
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div style="display: flex;flex-direction: column;">
                            <span style="font-size: 14px; color: rgba(57, 57, 57, 0.479);margin-bottom: 5px;">未完成</span>
                            <count-to :start-val="0" :end-val="getNoDone || 0" :duration="1000"
                                style="font-size: 25px;"></count-to>
                            <div class="line line-orange "></div>
                        </div>

                    </a-col>
                    <a-col :span="6">
                        <div style="display: flex;flex-direction: column;">
                            <span style="font-size: 14px; color: rgba(57, 57, 57, 0.479);margin-bottom: 5px;">完成率(%)</span>
                            <count-to :start-val="0" :end-val="getRate || 0" :duration="1000" :suffix="'%'"
                                style="font-size: 25px;"></count-to>
                            <div class="line line-purple"></div>
                        </div>
                    </a-col>

                </a-row>
            </div>

            <!-- 可视化图形 -->
            <div class="keshihuaPanels">
                <div id="main" style="width: 100%; height: 400px;padding: 1rem;">
                </div>

                <div style="display: flex; justify-content: space-between; width: 100%;" class="keshihuaY">
                    <div id="main1" class="customStyle"></div>

                    <div class="statusPinia customStyle" id="default"></div>
                </div>

            </div>



        </div>

    </div>
</template>

<script lang='ts' setup>




import { ref, onMounted, computed } from "vue"
import { getTasks, getTasksNum, getTypeTasksNum } from "@/apis/task";
import createEChart from '@/utils/echarts'
import { WorkItem } from '@/interfaces/tasks/index'
import { EChartsOption } from "echarts";
import defaultOption from './echartsOptions/index'

const MyData = ref<WorkItem[]>([])
const CurrentUserid: string | null = localStorage.getItem("CurrentUserid");



const getData = async () => {
    // get请求, 使用axios
    const res: any = await getTasks(CurrentUserid)
    if (res.code == 200) {
        MyData.value = res.data
    }
}


// 获取近七天完成的任务量和对应的日期
const getSevenData = async () => {
    const res: any = await getTasksNum(CurrentUserid)
    return res
}

// 获取不同类型任务的数量
const getTypeData = async () => {
    const res: any = await getTypeTasksNum(CurrentUserid)
    return res
}
interface ChartOptions {
    // ECharts 参数配置
    echartsConfig: EChartsOption;
    // 目标容器的 DOM 元素 ID
    containerId: string;
}



onMounted(async () => {

    let categoryTypeNumObj = await getTypeData();


    let dateArray: string[] = [];
    let finishedTasksArray: number[] = [];
  

    try {
        [dateArray, finishedTasksArray] = await getSevenData();
    } catch (error) {
        console.error('Error fetching data:', error);
        // 在请求失败时使用默认值
        dateArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        finishedTasksArray = [120, 200, 150, 80, 70, 110, 130];
    }



    const optioLine: ChartOptions = {
        containerId: 'main',
        echartsConfig: {
            xAxis: {
                // 如果后端返回来数据 就用后端的 , 如果接口失败, 或者返回为空, 采用默认的
                data: dateArray.reverse() || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            // 设置标题
            title: {
                text: '近一周每日完成任务数量',
            },
            // 添加图例
            legend: {
                orient: 'vertical',
                right: 0,
                top: 'bottom'
            },

            yAxis: {},
            series: [
                {
                    // // 如果后端返回来数据 就用后端的 , 如果接口失败, 或者返回为空, 采用默认的
                    data: finishedTasksArray.reverse()  || [120, 200, 150, 80, 70, 110, 130],
                    type: 'line',
                    label: {
                        show: true,
                        position: 'bottom',
                        formatter: '{c}个',
                        fontSize: 12
                    },
                    itemStyle: {
                        color: 'rgb(255, 69, 0)',
                        borderColor: 'rgb(255, 69, 0)',
                        borderWidth: 2

                    }
                }
            ]
        }

    }

    const optionPie: ChartOptions = {
        containerId: 'main1',
        echartsConfig: {
            title: {
                text: '不同类型任务数量分布',
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '指标',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    // padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: categoryTypeNumObj || [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        }

    };
    createEChart(optioLine)
    createEChart(optionPie)
    createEChart(defaultOption)

    await getData()
})

// 任务总数
const getlen = computed(() => MyData.value.length);

// 已完成的数量
const getDone = computed(() => MyData.value.filter(item => item?.status === true).length);

// 没有完成的数量
const getNoDone = computed(() => MyData.value.filter(item => item?.status === false).length);

// 完成率
const getRate = computed(() => (getDone.value / getlen.value) * 100);
</script>

<style lang='scss' scoped>
.DataMetrics-Page {
    padding: 1rem;

    .DataMetrics {
        width: 100%;
        padding: 1rem;
        box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);

        .indice {
            display: flex;
            align-items: center;
            justify-content: space-around;

            .ant-col-12 {
                flex: 0 0 20%;
            }

            // 指标 ==> 下划线
            .line {
                height: 0.3rem;
                background-color: #00A9CE;
                margin-bottom: 1rem;
                border-radius: 0.7rem;
            }

            .line-green {
                background-color: #79C000;
            }

            .line-orange {
                background-color: #FF671F;
            }

            .line-purple {
                background-color: #9B26B6;
            }


        }
    }

    .keshihuaPanels {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;

        #main {
            box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
        }

        .customStyle {
            width: 49%;
            height: 500px;
            padding: 1rem;
            border-color: transparent;
            box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
        }


    }
}


//  媒体响应
@media screen and (max-width: 768px) {
    .keshihuaY {
        flex-direction: column;
        gap: 16px;



        .customStyle {
            width: 100% !important;
        }
    }
}
</style>