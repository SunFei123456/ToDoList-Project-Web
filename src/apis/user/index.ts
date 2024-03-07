import request from "@/server/request";
import { LoginDataType, UserAccount } from "@/interfaces/user";

// 登录
export function LoginApi(fromData: LoginDataType) {
  return request({
    url: "/user/login",
    method: "post",
    data: fromData,
  });
}

// 注册
export function RegisterApi(data: UserAccount) {
  return request({
    url: "/user/register",
    method: "post",
    data: data,
  });
}

// 获取用户信息
export function GetUserInfo(id: any) {
  return request({
    url: `/user/getUserInfo/${id}`,
    method: "post",
  });
}

// 更新用户信息

export function updateUserInfoApi(currentUser: string | null, data: any) {
  return request({
    url: `/user/updateUserInfo/${currentUser}`,
    method: "put",
    data: data,
  });
}

//  更新用户自定义的侧边栏的背景颜色
// http://127.0.0.1:8080/user/updateUserSidebarColor/1?color=rgb%2871%2C%20145%2C%20235%29

export function updateUserSidebarColor(
  currentUser: string | null,
  color: string
) {
  return request({
    url: `/user/updateUserSidebarColor/${currentUser}`,
    method: "put",
    data: {
      color,
    },
  });
}

// 更新用户累计签到的天数http://127.0.0.1:8080/user/increaseSignInDays/1
export function updateUserSignDays(currentUser: string | null) {
  return request({
    url: `/user/increaseSignInDays/${currentUser}`,
    method: "put",
  })
}

// 获取用户累计签到的天数
export function getUserSignDays(currentUser: string | null) {
  return request({
    url: `/user/getSignInDays/${currentUser}`,
    method: "get",
  })
}

// 判断用户今天是否已经签到过
export function getIsSignIn(currentUser: string | null) {
  return request({
    url: `/user/isSignInToday/${currentUser}`,
    method: "get",
  })
}
