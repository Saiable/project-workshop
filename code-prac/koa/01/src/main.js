
const {APP_PORT} = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT, () => { // 开启服务
    console.log(`server is running on http://localhost:${APP_PORT}`);
})

