import request from "@/server/request";

// 获取商品列表
export function getGoodsList() {
  return request({
    url: `/goods/get_goods`,
    method: "get",
  });
}

// 用户兑换奖品
// http://127.0.0.1:8080/goods/exchange_goods?user_id=1&goods_id=4
// post

export function exchangeGoods(user_id: string | null, goods_id: number) {
  return request({
    url: `/goods/exchange_goods?user_id=${user_id}&goods_id=${goods_id}`,
    method: "post",
  });
}
