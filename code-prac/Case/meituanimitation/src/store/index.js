import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: [], // 购物车数据
    isDelete: true, // Header组件点击编辑，控制CartDetail组件
    edit: true, // 默认展示编辑状态
    orderList: [],
    orderListEnd: [],
    userAddress: [
      {
        id: '1001',
        name: 'jason',
        tel: '1894743008',
        province: '广东省',
        city: '深圳市',
        county: '南山区',
        addressDetail: '深圳湾',
        isDefault: true,
        areaCode: '110101',
      },
      {
        id: '1002',
        name: 'allen',
        tel: '1894743008',
        province: '湖北省',
        city: '武汉市',
        county: '武昌区',
        addressDetail: '黄鹤楼',
        isDefault: false,
        areaCode: '110101',
      }
    ],
  },
  getters: {
  },
  mutations: {
    addCart(state, value) {
      state.cartList = value
    },
    changeDelete(state, value) {
      state.isDelete = !state.isDelete
    },
    delete(state, value) {
      state.cartList = value
    },
    edit(state, value) {
      if (value) {
        state.edit = true
      } else {
        state.edit = !state.edit
      }
    },
    pay(state, value) {
      state.orderList = value
    },
    orderListEd(state, value) {
      state.orderListEnd = state.orderListEnd.concat(state.orderList)
    },
    addaddress(state, value) {
      state.userAddress.map(item => {
        if (value.isDefault) {
          item.isDefault = false
        }
      })
      state.userAddress.push(value)
    },
    editaddress(state, value) {
      state.userAddress = state.userAddress.map(item => {
        if (value.isDefault) {
          item.isDefault = false
        }
        // if (item.id == value.id) {
        //   return value
        // } else {
        //   return item
        // }
        return item.id == value.id ? value : item
      })
    },
    deleteaddress(state, value) {
      state.userAddress = state.userAddress.filter(item => {
        return !(item.id === value.id)
      })
      if (value.isDefault) {
        state.userAddress[0].isDefault = true
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
