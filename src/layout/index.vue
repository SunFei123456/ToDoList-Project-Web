<template>
      <div class="contain">
            <div class="left">
                  <leftOfHome />
            </div>

            <div class="right">
                  <router-view v-slot="{ Component }">
                        <transition name="fade">
                              <component :is="Component" />
                        </transition>
                  </router-view>
            </div>
            <LevelUpCard ref="openCard"></LevelUpCard>
      </div>
</template>

<script lang="ts" setup>
import leftOfHome from "./components/left-of-home.vue";
import LevelUpCard from "@/components/level-up-card/index.vue";
import { useUserStore } from "@/store/user/userStore";
import { ref, watch } from "vue";

const UserInfo = useUserStore()
const openCard = ref<any>(null)


//  监听userInfo 仓库的经验值的变化
//  通过判断newExperience 的值是否为下一等级需要的经验值
// 当经验值发生变化的时候执行 , 如果正好处于下一等级需要的经验值之间 
// 比如lv2 级别 经验值应该满足在 500~ 1000 包括500,但不包括1000
//  那么就进行升级弹框的弹出, 并store useUserStore 里面的level 字段进行更新
// 找到下一个等级所需的经验值
// 侦听经验值的变化
let currentLevel = UserInfo.level; // 获取现在的用户等级
watch(() => UserInfo.experience, (newExperience) => {
      // 根据经验值设置等级
      if (newExperience >= 0 && newExperience < 200) {
            UserInfo.level = '0';
      } else if (newExperience >= 200 && newExperience < 500) {
            UserInfo.level = '1';
      } else if (newExperience >= 500 && newExperience < 1000) {
            UserInfo.level = '2';
      } else if (newExperience >= 1000 && newExperience < 1700) {
            UserInfo.level = '3';
      } else if (newExperience >= 1700 && newExperience < 2800) {
            UserInfo.level = '4';
      } else if (newExperience >= 2800 && newExperience < 4400) {
            UserInfo.level = '5';
      } else if (newExperience >= 4400 && newExperience < 6800) {
            UserInfo.level = '6';
      } else if (newExperience >= 6800 && newExperience < 9800) {
            UserInfo.level = '7';
      } else if (newExperience >= 9800 && newExperience < 13000) {
            UserInfo.level = '8';
      } else if (newExperience >= 13000 && newExperience < 16000) {
            UserInfo.level = '9';
      } else {
            UserInfo.level = '10';
      }
      // console.log("121", UserInfo.level, currentLevel);
      // console.log(parseInt(UserInfo.level)  === parseInt(currentLevel));
      // console.log(typeof parseInt(UserInfo.level) , typeof parseInt(currentLevel));
      // 如果等级发生了变化，弹出升级卡片
      if (parseInt(UserInfo.level) !== parseInt(currentLevel)) {
            currentLevel = UserInfo.level; // 更新当前等级
            openCard.value.openModel(); // 弹出升级卡片
      }
});


</script>

<style lang="scss" scoped>
.contain {
      width: 100%;
      height: 100%;
      display: flex;

      .left {
            flex: 0.3;
            border-right: #c7c7c7 2px solid;
      }

      .right {
            flex: 0.7;
            overflow: auto;
      }
}


// 当屏幕小于500px的时候
@media (max-width: 758px) {

      /* 在这里添加你的样式 */
      .contain {
            flex-direction: column;

            .left {
                  width: 100%;
            }

            .right {
                  width: 100%;
            }
      }
}
</style>
