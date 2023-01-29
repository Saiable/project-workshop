<template>
    <div class="createOrder">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.orderList">
                <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ totalPrice }}</span>
            </div>
            <van-button type="primary" class="pay-btn" block color="#ffc400"
                @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from "vuex";
import {useRouter, useRoute} from "vue-router";
import { showDialog } from 'vant';

export default {
    components: {
        Header,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            tel: "14232",
            name: "sai",
            totalPrice: 0,
        })
        const onEdit = () => { 
            router.push('address')
         };
        const initPrice = () => {
            let price = 0;
            if (store.state.orderList.length) {
                store.state.orderList.forEach((item) => {
                    price += item.num * item.price;
                })
            }
            data.totalPrice = price;
        }

        const initUser = () => {
            store.state.userAddress.forEach(item => {
                if (item.isDefault) {
                    data.name = item.name
                    data.tel = item.tel
                }
            })
        }
        onMounted(() => {
            initPrice();
            initUser();
        })

        const handleCreateOrder = () => {
            showDialog({
                title: '提示',
                message: '生成订单成功',
            }).then(() => {
                // 结算的商品，从购物车中过滤
                let newList = store.state.cartList.filter(item => {
                    return !route.query.list.includes(item.id + "")
                })
                store.commit('delete', newList)
                store.commit('orderListEd')
                router.push('order')
            });
        }
        return {
            ...toRefs(data),
            onEdit,
            store,
            initPrice,
            handleCreateOrder,
        }
    },

}
</script>

<style>

</style>