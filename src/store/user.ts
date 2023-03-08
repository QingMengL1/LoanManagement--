import { getUserInfo } from "@/api/user";
import router from "@/router";
import { defineStore } from "pinia";
import { UserState } from "./types";

export const useUserStore = defineStore("counter", {
  // state: () => {
  //   {
  //     count: 0;
  //   }
  // },
  // 也可以定义为
  state: (): UserState => ({
    name: "admin",
    role: "admin",
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    getRole() {
      return new Promise((resolve) => {
        resolve(this.role);
      });
    },

    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    resetInfo() {
      this.$reset();
    },

    async info() {
      const res = await getUserInfo();
      // this.setInfo(res);
    },

    async logout() {
      router.push({ name: "Login" });
    },
  },
});
