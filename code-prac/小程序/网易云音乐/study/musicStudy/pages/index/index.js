// index.js
import request from '../../utils/request.js'
Page({
    data: {
        bannerList: [], // 轮播图数据
        recommendList: [], // 推荐歌单数据
    },
    onLoad: async function(options) {
        console.log('index加载了')

        // 获取轮播图数据
        let bannerListData = await request('/banner', {type: 2})
        this.setData({
            bannerList: bannerListData.banners
        })

        // 获取歌单数据
        let recommendListData = await request('/personalized', {limit: 10})
        this.setData({
            recommendList: recommendListData.result
        })
    }
})