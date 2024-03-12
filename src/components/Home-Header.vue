<template>
  <div class="HH-card">
    <!-- 头像 -->
    <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" :src="user.avatar_url "
      :draggable="isDrag" class="avatar">
    </a-avatar>


    <div class="HH-right--content">
      <h3>{{ greeting }} - {{ user.owner.name || "用户" }}</h3>
      <p>
        {{ user.HomeMotivationalWords || "宝子,这个位置是用来放置激励语的,可以在个人信息页面进行配置哦🩷" }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user/userStore";

import determineGreeting from "@/utils/determineGreeting";
import { ref } from "vue";
const user = useUserStore()

const greeting = ref(determineGreeting());
// 头像是否允许拖拽 == false
const isDrag = ref<boolean>(true);

</script>

<style lang="scss" scoped>
$small-text-color: #758a99;

.HH-card {
  display: flex;

  width: 100%;
  min-height: 20%;
  padding: 16px;
  background-color: #fff;
  transition: box-shadow 0.3s, border-color 0.3s;

  &:hover {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }

  .avatar {
    cursor: pointer;
    margin-right: 16px;

    &:hover {
      transform: rotate(666turn);
      transition-delay: 1s;
      transition-property: all;
      transition-duration: 59s;
      transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
    }
  }

  .HH-right--content {
    flex: 1;
    flex-wrap: wrap;

    p {
      font-size: 14px;
      color: $small-text-color;
    }
  }
}
</style>
