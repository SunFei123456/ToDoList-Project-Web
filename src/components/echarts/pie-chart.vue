<template>
  <div id="mainPie" style="width: 55%; height: 400px;background-color: #fff;" >
  </div>
</template>

<script lang="ts" setup>

import { onMounted } from "vue";
import createEChart from "@/utils/echarts";
import { EChartsOption} from 'echarts';

interface ChartOptions {
  // ECharts 参数配置
  echartsConfig: EChartsOption;
  // 目标容器的 DOM 元素 ID
  containerId: string;
}

const optioLine: ChartOptions = {
  containerId: 'mainPie',
  echartsConfig : {
    title: {
      text: "项目所需技术",
    },
    legend: {
        orient: 'vertical',
      left: 10,
      top: "center",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [20, 150],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "TypeScript" },
          { value: 38, name: "Vue3" },
          { value: 32, name: "Vue-Router" },
          { value: 30, name: "Ant-Design-Vue" },
          { value: 28, name: "Echarts" },
          { value: 26, name: "Axios" },
          { value: 22, name: "Sass" },
          { value: 18, name: "Vite" },
          { value: 22, name: "MySql" },
          { value: 25, name: "Python FaseApi" },
          { value: 20, name: "sqlalchemy" },
        ],
      },
    ],
  }
}





onMounted(() => {
  createEChart(optioLine)
});
</script>

<style lang="scss" scoped>
#mainPie {
  padding: 16px;
}
</style>
