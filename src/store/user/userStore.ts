// userStore.ts
import { defineStore } from "pinia";
import { GetUserInfo } from "@/apis/user/index";

interface UserState {
  id: number | null;
  avatar_url: string; // 用户头像
  experience: number | null; // 经验值
  gender: string; // 性别
  hobbies: string; // 兴趣
  level: string; // 等级
  points: number; // 积分
  owner: object;
  introduction: string; // 个人语录
  phone: string | null;// 手机号
  age: number | null; // 年龄
  HomeMotivationalWords: string | null // 自定义首页激励语
}

export const useUserStore = defineStore(
  "user",
  {
    state: (): UserState => ({
      id: 0, // id
      avatar_url: "", // 用户头像
      experience: 0, // 经验值
      gender: "", // 性别
      hobbies: "", // 兴趣
      level: "", // 等级
      points: 0, // 积分
      owner: {}, // 所属者
      introduction: "", // 个人语录
      phone:"", // 手机号
      age:0, // 年龄
      HomeMotivationalWords:"" // 自定义首页激励语
    }),
    actions: {
      //  获取用户相关的数据 的接口
      async getUserInfoHandle(this: UserState, id: number) {
        const res: any = await GetUserInfo(id);
        console.log(res);
        
        if (res.code == 200) {
          this.id = res.data.id;
          this.avatar_url = res.data.avatar;

          this.experience = res.data.experience;
          this.gender = res.data.gender;
          this.hobbies = res.data.hobbies;
          this.level = res.data.level;
          this.points = res.data.points;
          this.owner = res.data.owner;
          this.introduction = res.data.introduction;
          this.phone = res.data.phone;
          this.age = res.data.age;
          this.HomeMotivationalWords = res.data.HomeMotivationalWords
        }
      },
    },
    getters: {},
  },
  {
    persist: {
      enabled: true,
      key: "userinfo",
      storage: localStorage,
    },
  }
);
