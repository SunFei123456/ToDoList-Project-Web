import { EChartsOption } from "echarts";

const data = [];
for (let i = 0; i <= 100; i++) {
  let theta = (i / 100) * 360;
  let r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
  data.push([r, theta]);
}
interface ChartOptions {
    // ECharts 参数配置
    echartsConfig: EChartsOption;
    // 目标容器的 DOM 元素 ID
    containerId: string;
}

const defaultOption:ChartOptions = {
  containerId: "default",
  echartsConfig: {
    title: {
      text: "Two Value-Axes in Polar",
    },
    legend: {
      data: ["line"],
    },
    polar: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    angleAxis: {
      type: "value",
      startAngle: 0,
    },
    radiusAxis: {},
    series: [
      {
        coordinateSystem: "polar",
        name: "line",
        type: "line",
        data: data,
      },
    ],
  },
};

export default defaultOption