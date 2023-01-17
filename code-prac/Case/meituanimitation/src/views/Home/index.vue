<template>
  <div class="home">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location-o" />
          <span>北京</span>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="main">
        <div class="main-bg">
          <div class="search">
            <input type="text" />
            <div class="search-text">搜索</div>
          </div>

          <div class="sort">
            <div class="main-sort">
              <div v-for="(item, index) in main_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
            <div class="aside-sort">
              <div v-for="(item, index) in aside_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <van-tabs v-model:active="tabActive" class="van-tabs">
          <van-tab
            :title="item.tab"
            v-for="(item, index) in content_nav_list"
            :key="index"
          >
            <nav-list :navList="item.data"></nav-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import NavList from "./components/NavList.vue";
export default {
  setup() {
    const tabActive = ref(0);
    let data = reactive({
      main_sort: [
        {
          name: "美食",
          icon: "icon-meishi1",
        },
        {
          name: "甜点饮品",
          icon: "icon-tiandian-",
        },
        {
          name: "超市便利",
          icon: "icon-chaoshi",
        },
        {
          name: "生鲜",
          icon: "icon-shengxian-haixian",
        },
        {
          name: "买药",
          icon: "icon-yao-2",
        },
      ],
      aside_sort: [
        {
          name: "午餐",
          icon: "icon-wucan",
        },
        {
          name: "酒类",
          icon: "icon-jiu",
        },
        {
          name: "水果",
          icon: "icon-shengxian-ganju",
        },
        {
          name: "汉堡披萨",
          icon: "icon-hanbao",
        },
        {
          name: "休闲饮品",
          icon: "icon-yinliao",
        },
        {
          name: "夜宵",
          icon: "icon-yexiao",
        },
        {
          name: "吐司",
          icon: "icon-tusi",
        },
        {
          name: "跑腿",
          icon: "icon-paotuiAPP",
        },
        {
          name: "美人佳丽",
          icon: "icon-kouhong",
        },
        {
          name: "全部分类",
          icon: "icon-quanbu",
        },
      ],
      content_nav_list: [
        {
          tab: "天天神券",
          data: [
            {
              pic: "https://img2.baidu.com/it/u=2557642827,1560073047&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
        {
          tab: "会员满减",
          data: [
            {
              pic: "",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
        {
          tab: "点评高分",
          data: [
            {
              pic: "",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
      ],
    });

    return {
      ...toRefs(data),
      tabActive,
    };
  },
  components: {
    NavList,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
    .header {
      background-image: linear-gradient(#ffc400, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;
      .text {
        font-size: 20px;
        font-weight: 600;
      }
      .location {
        span {
          margin: 0 5px;
        }
        font-size: 14px;
      }
    }
    .main {
      margin-top: -30px;
      .main-bg {
        background-image: linear-gradient(#fff, #f5f5f5);
        padding: 10px 20px 0px 20px;
        border-radius: 30px 30px 0 0;
        .search {
          position: relative;
          input {
            width: 100%;
            height: 30px;
            border: 1px solid #ffc400;
            border-radius: 20px;
          }
          .search-text {
            position: absolute;
            right: -6px;
            top: 1px;
            width: 50px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            text-align: center;
            background-color: #ffc400;
            border-radius: 16px;
          }
        }
        .sort {
          padding: 20px 0;
          .main-sort {
            display: flex;
            div {
              flex: 1;
              display: flex;
              justify-content: content;
              align-items: center;
              flex-direction: column;
              font-size: 16px;
              .icon {
                width: 45px;
                height: 45px;
                margin-bottom: 5px;
              }
            }
          }
          .aside-sort {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            div {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              width: 20%;
              font-size: 14px;
              .icon {
                width: 30px;
                height: 30px;
                marign: 10px;
              }
            }
          }
        }
      }
      .van-tabs {
        padding: 0 20px 10px;
        :deep(.van-tabs__wrap) {
          border-radius: 10px;
        }
        // :deep(.van-tabs__content .van-tab__panel div)  {
        //   margin-top: 5px;
        // }
      }
    }
  }
}
</style>