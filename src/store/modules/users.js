import { api, setToken, clearToken } from "../api";
import JwtService from "@/common/jwt.service";

export default {
    namespaced: true,
    state: {
        user: {},
        profile: null,
        errors: null
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
        },
        setErrors(state, error) {
            state.errors = error;
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
            else{
                commit("setErrors", {});
            }
        },
        logout({ commit }){
            commit("purgAuthentication");
        },
        loginUser: function ({ commit }, { email, password }) {
            clearToken();
            return new Promise(resolve => {
                api.post("/users/login", { user: {
                    email,
                    password
                } })
                  .then(({ data }) => {
                    setToken(data.user.token);
                    commit("setUser", data.user);
                    commit("setAuthentication", data.user);
                    resolve(data);
                  })
                  .catch(({ response }) => {
                    commit("setErrors", response.data.errors);
                  });
              });           
        },
        registerUser: function ({ commit },{ username, email, password }) {
            return new Promise(resolve => {
                api.post("/users", {
                    user: {
                        username,
                        email,
                        password
                    }
                })
                  .then(({ data }) => {
                    setToken(data.user.token);
                    commit("setUser", data.user);
                    commit("setAuthentication", data.user);
                    resolve(data);
                  })
                  .catch(({ response }) => {
                    commit("setErrors", response.data.errors);
                  });
              });           
        },
        updateUserSettings({commit}, payload) {
            const { email, username, password, image, bio } = payload;
            const user = {
              email,
              username,
              bio,
              image
            };
            if (password) {
              user.password = password;
            }
        
            return api.put("user", user).then(({ data }) => {
              commit("setAuthentication", data.user);
              return data;
            });
        }
    }
}