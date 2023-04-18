import {
  request
} from "@/utils/request"

export function getUserConfig() {
  return request({
    url: '/user/config',
  })
}

export function setUserConfig(data) {
  return request({
    method: 'post',
    url: '/user/config-modify',
    data
  })
}


export function getUserData() {
  return request({
    url: '/user/info',
  })
}

export function setAvatorData(data) {
  return request({
    method: 'post',
    url: '/user/modify-head-logo',
    data
  })
}

export function setEmailData(data) {
  return request({
    method: 'post',
    url: '/user/modify-email',
    data
  })
}

export function setGenderData(data) {
  return request({
    method: 'post',
    url: '/user/modify-gender',
    data
  })
}

export function setNicknameData(data) {
  return request({
    method: 'post',
    url: '/user/modify-nickname',
    data
  })
}

export function setPassportData(data) {
  return request({
    method: 'post',
    url: '/user/modify-password',
    data
  })
}

export function userSignin(data) {
  return request({
    method: 'post',
    url: '/user/sign-in',
    data
  })
}

export function userSignout() {
  return request({
    url: '/user/sign-out',
  })
}

export function userSignup(data) {
  return request({
    method: 'post',
    url: '/user/sign-up',
    data
  })
}

export function checkNickname(query) {
  return request({
    url: '/user/check-nickname',
    params: {
      nickname: query
    }
  })
}

export function checkPassport(query) {
  return request({
    url: '/user/check-passport',
    params: {
      passport: query
    }
  })
}
// 搜索引擎排序
export function engineSort(data) {
  return request({
    method: 'post',
    url: '/search/engine/sort',
    data
  })
}