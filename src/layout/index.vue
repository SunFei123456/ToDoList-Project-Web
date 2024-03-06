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
      </div>
</template>

<script lang="ts" setup>
import leftOfHome from "./components/left-of-home.vue";
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
