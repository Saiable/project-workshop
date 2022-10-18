// index.js
import request from '../../utils/request.js'
Page({
    data: {
        bannerList: [], // 轮播图数据
        recommendList: [], // 推荐歌单数据
        topList: [], // 排行榜数据
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

        // 获取排行榜数据
        /**
         * 需求分析：
         *  1.需要根据idx的值获取对应的数据
         *  2.idx的取值范围是0-20，我们需要0-4
         *  3.需要发5次请求
         */
        let index = 0,
            resultArr = []
        while(index < 5) {
            let topListData = await request('/top/list', {idx: index++})
            let topListItem  = {
                name: topListData.playlist.name,
                tracks: topListData.playlist.tracks.slice(0, 3)
            }
            resultArr.push(topListItem)
            // 更新topList的值，发一次就更新一次（多渲染几次，用户体验较好，弱网用户不会有较长时间的白屏）
            this.setData({
                topList: resultArr
            })
        }



    }
})