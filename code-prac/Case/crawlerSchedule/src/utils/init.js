import axios from "axios";
import Vue from "vue";

export async function getServerConfig() {
  return await new Promise((resolve, reject) => {
    axios
      .get("./serverConfig.json")
      .then((res) => {
        // console.log("读取外部化配置文件>>>>>>>>");
        // console.log(res.data); // 是否成功读取需要的配置项
        for (let key in res.data) {
        //   console.log(key);
          Vue.prototype["$" + key] = res.data[key];
        }
        // console.log(Vue.prototype.$baseURL); // 验证是否已经把属性挂载在了Vue的原型上
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
}
