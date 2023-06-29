import { getUserInfo, LoginData, userLogin, userLogout } from "@/api/user";
import router from "@/router";
import { clearToken, setToken } from "@/utils/auth";
import { defineStore } from "pinia";
import { UserState } from "./types";

export const useUserStore = defineStore("counter", {
  state: (): UserState => ({
    name: undefined,
    email: undefined,
    phone: undefined,
    qq: undefined,
    role: "",
    id: "",
    nowMenu: "",
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
      this.setInfo(res.data);
    },

    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    logoutCallBack() {
      this.resetInfo();
      clearToken();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
        window.sessionStorage.removeItem("activeMenu");
        router.push({ name: "Login" });
      }
    },
  },
});
