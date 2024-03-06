import request from "@/server/request";

//  头像图片绑定用户
//  userid: 用户的id
//  url : 图片的url
export function bindUserOfavatar(userid: string | null, url: string) {
  return request({
    url: `/update_avatar/${userid}`,
    method: "put",
    data: {
      url,
    },
  });
}
