import request  from "@/server/request";

// 1. 根据id查询 返回任务列表
export function getTasks(owneId: string | null) {
  return request({
    url: `/todolist/showList/?owner_id=${owneId}`,
    method: "get",
  });
}

// 2. 更新任务的状态

export function UpdataTasksStatus(owneId: string | null, id: number) {
  return request({
    url: `/todolist/update/?owner_id=${owneId}&todoListed=${id}`,
    method: "put",
  });
}

// 3. 删除任务

export function DelTask(owneId: string | null, id: number) {
  return request({
    url: `/todolist/delete/${id}?owner_id=${owneId}`,
    method: "delete",
  });
}

// 4. 添加任务

export function AddTask(userid: string | null, data: any) {
  return request({
    url: `/todolist/add/${userid}`,
    method: "post",
    data: data,
  });
}


// 5. 获取近七天每天完成的任务量 和 对应的日期

export function getTasksNum(userid: string | null) {
  return request({
    url: `/todolist/recentfinishedTask/?owner_id=${userid}`,
    method: "get",
  });
}
// 6. 获取每个类型的任务完成的数量分布情况
export function getTypeTasksNum(userid: string | null) {
  return request({
    url: `/todolist/tasktypeCount/?owner_id=${userid}`,
    method: "get",
  })
}



// 7. 获取制定的任务总量
// http://127.0.0.1:8080/todolist/getTasksNum/1
export function getTaskNum(userid: string | null) {
  return request({
    url: `/todolist/getTasksNum/${userid}`,
    method: "get",
  })
}

// 8. 获取已完成的任务总量
// http://127.0.0.1:8080/todolist/getComplete_TasksNum/1
export function getCompleteTaskNum(userid: string | null) {
  return request({
    url: `/todolist/getComplete_TasksNum/${userid}`,
    method: "get",
  })
}