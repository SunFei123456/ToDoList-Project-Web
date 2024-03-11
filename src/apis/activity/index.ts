import request from "@/server/request";

// 获取活动列表
export function getActivityList(){
  return request({
    url: `/activity/get_activity`,
    method: "get",
  });
}


// 根据id获取指定任务
export function getActivityById(id: number){
  return request({
    url: `/activity/get_activity_by_id/${id}`,
    method: "get",
  });
}