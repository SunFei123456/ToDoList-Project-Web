import * as echarts from "echarts";
// 封装一个通用的echarts 图表的函数

type EChartsOption = echarts.EChartsOption;

interface ChartOptions {
  // ECharts 参数配置
  echartsConfig: EChartsOption;
  // 目标容器的 DOM 元素 ID
  containerId: string;
}

// 封装的 ECharts 图表函数
function createEChart(options: ChartOptions) {
  const { echartsConfig, containerId } = options;

  // 获取容器元素
  const containerElement = document.getElementById(containerId);

  // 如果容器元素不存在，抛出错误或者进行其他处理
  if (!containerElement) {
    console.error(`Container element with ID ${containerId} not found.`);
    return;
  }

  // 如果容器元素已经存在 ECharts 实例，先销毁之前的实例
  const existingChartInstance = echarts.getInstanceByDom(containerElement);
  if (existingChartInstance) {
    existingChartInstance.dispose();
  }

  // 初始化新的 ECharts 实例
  const chartInstance = echarts.init(containerElement);

  // 使用指定的配置项和数据显示图表
  chartInstance.setOption(echartsConfig);
  // 在窗口大小改变时调整图表大小
  window.addEventListener("resize", () => {
    // 检查实例是否已经被销毁
    if (!chartInstance.isDisposed()) {
      chartInstance.resize();
    }
  });
}

export default createEChart;
