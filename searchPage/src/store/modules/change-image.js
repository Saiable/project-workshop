import {REMOTEIMAGE, LOCALIAMGE} from '@/store/mutation-types'
export default {
  state: {
    remoteImage: false,
    localImage: false,
  },
  mutations: {
    // 这里逻辑上是相同的，但是代码的写法，不能合并成一个变量，因为最后监听的是两个状态
    [REMOTEIMAGE] (state) {
      state.remoteImage = !state.remoteImage
    },
    [LOCALIAMGE] (state) {
      state.localImage = !state.localImage
    },
  }
}
