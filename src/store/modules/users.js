import { api, setToken, clearToken } from "../api";
import JwtService from "@/common/jwt.service";

export default {
    namespaced: true,
    state: {
        user: null,
        profile: null
    },
    getters: {
        username(state) {
            return (state.user && state.user.username) || null;
        },
        currentUser(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthentication(state, user) {
            state.isAuthenticated = true;
            state.user = user;
            state.errors = {};
            JwtService.saveToken(state.user.token);
        },
        purgAuthentication(state) {
            state.isAuthenticated = false;
            state.user = {};
            state.errors = {};
            JwtService.destroyToken();
        }
    },
    actions: {
        getUser: function ({ commit }) {
            const user = api.get("/user");
            commit("setUser", user);
        },
        userLoggedIn: function({ commit }){
            var token = JwtService.getToken();
            if(token) {
                setToken(token);
                api.get("user").then(({data}) => {
                    commit("setUser", data.user);
                    commit("setAuthentication", data.user);
                })
            }
        },
        loginUser: async function ({ commit }, { email, password }) {
            clearToken();
            try {
                const response = await api.post("/users/login", {
                    user: {
                        email,
                        password
                    }
                });
                if (response.data.user) {
                    setToken(response.data.user.token);
                    commit("setUser", response.data.user);
                    commit("setAuthentication", response.data.user);
                }
            } catch (e) {
                throw e;
            }
        },
        registerUser: async function ({ username, email, password }) {
            try {
                await api.post("/users", {
                    user: {
                        username,
                        email,
                        password
                    }
                });
            } catch (e) {
                throw e;
            }
        }
    }
}