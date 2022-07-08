<template>
<!--    <div class="content_page">-->
<!--        content_page-->
<!--        <div class="content_page_main">-->
<!--            content_page_main12-->
<!--            {{url}}-->
<!--        </div>-->
<!--        <div class="content_page_footer">-->
<!--            content_page_footer123-->

<!--        </div>-->
<!--    </div>-->
</template>

<script>
    export default {
        data() {
            return {
                title: '...',
                url: '...'
            }
        },
        methods: {
            bb() {
                this.url = '123';
                chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'},
                    function (response) {
                        // console.log('收到来自后台的回复：' + response);
                    });

            }
        },
        // mounted() {
        //     this.bb()
        // }
    }
</script>

<style scoped>
    .content_page {
        color: red;
        position: fixed;
        z-index: 100001;
        right: 10px;
        bottom: 10px;
    }

    .content_page_main {
        color: green;
    }


</style>
