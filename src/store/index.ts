// 导入
import { defineStore } from "pinia";

interface SunFeiStoreState {
  counter: number;
  isOpen: boolean;
  flag: boolean;
  color: string;
}

export const useStore = defineStore("SunFeiStore", {
  state: (): SunFeiStoreState => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      isOpen: false,
      flag: false,
      color: "#ffffff",
    };
  },
  getters: {
    // 类型是自动推断的，因为我们没有使用 `this`
    doubleCount: (state: SunFeiStoreState) => state.counter * 2,
    getOpenStatus: (state: SunFeiStoreState) => state.isOpen,
    getFlagStatus: (state: SunFeiStoreState) => state.flag,
  },
  actions: {
    changeOpenStatus(this: SunFeiStoreState): boolean {
      return (this.isOpen = !this.isOpen);
    },
    changeFlag(this: SunFeiStoreState): boolean {
      return (this.flag = !this.flag);
    },
  },
});
