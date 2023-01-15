// import { login, logout, getInfo } from '../../api/login'
import loginApi from '../../api/login'
import { getToken, setToken, removeToken } from '../../utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    phone: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
  },

  actions: {
    // 鐧诲綍
    Login({ commit }, userInfo) {
      const data = { 'Authentication': window.sessionStorage.getItem('token') }
      setToken(data.Authentication)
      commit('SET_TOKEN', data.Authentication)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginApi.login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 鑾峰彇鐢ㄦ埛淇℃伅
    GetInfo({ commit, state }) {
      const data = {
        'roles': 'admin',
        'name': 'admin',
        'phone': '12345678901',
        'avatar': 'https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/Docker/title.jpg'
      }
      commit('SET_ROLES', data.roles)
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)
      commit('SET_PHONE', data.phone)
      return new Promise((resolve, reject) => {
        loginApi.getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 楠岃瘉杩斿洖鐨剅oles鏄惁鏄竴涓潪绌烘暟缁?
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_PHONE', data.phone)
          // console.log(data.phone)
          // console.log(data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 鐧诲嚭
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PHONE', '')
      removeToken()
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 鍓嶇 鐧诲嚭
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
