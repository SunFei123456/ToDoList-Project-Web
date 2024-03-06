import request from "@/server/request";

// 1. 查询排行榜需要的信息
/**
 * url:http://127.0.0.1:8080/getRankings/
 * 
 * const data = [
    {
        Num:1,
        avatar_url:"xxx",
        nickName:"xxx",
        Signatures:"xxx",
        completeRate:"xxx"
    },
    {
        Num:1,
        avatar_url:"xxx",
        nickName:"xxx",
        Signatures:"xxx",
        completeRate:"xxx"
    }
]


 */
export function getRankings() {
  return request({
    url: `/getRankings`,
    method: "get",
  });
}

//  2. 根据用户完成的任务量 获取排行榜

export function getRankingsByCompleteNum() {
  return request({
    url: `/getRankingsByCompleteNum`,
    method: "get",
  });
}

// 3. 根据用户没有完成的任务量 获取排行榜
export function getRankingsByNoCompleteNum() {
  return request({
    url: "/getRankingsByNoCompleteNum",
    method: "get",
  });
}
