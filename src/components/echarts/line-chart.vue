<template>
  <div id="main" style="width: 45%; height: 400px; background-color: #fff;">
  </div>
</template>

<script lang="ts" setup>
import createEChart from '@/utils/echarts/index'
import { EChartsOption } from "echarts";
import { onMounted } from 'vue';
interface ChartOptions {
  // ECharts 参数配置
  echartsConfig: EChartsOption;
  // 目标容器的 DOM 元素 ID
  containerId: string;
}
const optioLine: ChartOptions = {
  containerId: 'main',
  echartsConfig: {
    title: {
      text: '本周的气温变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: 'Highest',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Lowest',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  }
}



onMounted(() => {
  createEChart(optioLine)
});
</script>

<style lang="scss" scoped>
#main {
  padding: 16px;
}
</style>
