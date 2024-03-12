import request from "@/server/request";

// 新用户注册登录大礼包
export function getNewUserPrize(user_id: string | null) {
  return request({
    url: `/reward/newUserRewards/${user_id}`,
    method: "put",
  });
}

// 用户等级升级 奖励

// http://127.0.0.1:8080/reward/levelUp?user_id=1

export function getLevelUpPrize(user_id: string | null) {
  return request({
    url: `/reward/levelUp/${user_id}`,
    method: "put",
  });
}
