import { number } from "echarts";

// 请求出错接口类型定义
export interface ErrorType {
  message: string;
}

// 添加任务表单数据
export interface JobFormType {
  title: string;
  content: string;
  weight: string;
  status: boolean;
  type: string;
}

// 单个任务类型 ==> 接收后端接口数据 ==> 一一对应
interface TaskType {
  id: number;
  title: string;
  summary: string;
  priority: string;
  category: string;
  createdTime: string;
}

// 完整任务字段类型
export interface WorkItem {
  category: string;
  content: string;
  create_time: string;
  id: number;
  owner_id: number;
  status: boolean;
  title: string;
  weight: string;
}

// 任务列表数组类型
interface WorkItemList {
  // 这里使用数组类型声明
  // WorkItem[] 表示一个 WorkItem 对象的数组
  items: WorkItem[];
}
