import {login, logout, getInfo, getInfoFront, getUserList, deleteUserList} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import {Message} from 'element-ui';
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        userList: [],
        total: 25
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERLIST: (state, userlist) => {
        const {rows, total} = userlist
        state.userList = rows
        state.total = total
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({passport: username.trim(), password: password}).then(response => {
                console.log('登录成功的response', response)
                const {data} = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfoFront().then(response => {
                console.log('前置路由里获取用户信息的response', response)
                const {data} = response
                if (!data) {
                    return reject('用户信息获取失败，请重新登录')
                }

                const {nickname, head_logo} = data

                commit('SET_NAME', nickname)
                commit('SET_AVATAR', head_logo)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    // get userList
    async getUserList({commit}, payload) {
        const {data} = await getUserList(payload)
        commit('SET_USERLIST', data)
    },

    // deleteIdList
    async deleteUserList({commit}, payload) {
        const {code} = await deleteUserList(payload)
        if(code == 0) {
            Message({
                message:'删除成功！',
                type: 'success'
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

