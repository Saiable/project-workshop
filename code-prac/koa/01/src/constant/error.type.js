// 定义错误类型
// 100 用户模块
// 101 授权模块
// 103 资源模块

// 每一种类型可以进一步携带status
module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或者密码为空',
        result: ''
    },
    userAlreadyExists: {
        code: '10002',
        message: '用户名已经存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userQueryError: {
        code: '10004',
        message: '用户信息获取错误',
        result: ''
    },
    userNotFound: {
        code: '10005',
        message: '账号或密码错误', // 不能说是账号错误
        result: ''
    },
    userLoginFailed: {
        code: '10006',
        message: '用户登录失败',
        result: ''
    },
    userInvalidPassword: {
        code: '10005',
        message: '账号或密码错误',// 不能说是密码错误，否则就告诉了登录这，账号是对的，就可能会被暴力破解
        result: ''
    },
    modifyPasswordFailed: {
        code: '10008',
        message: '修改密码失败',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    hasNoAdminPermission: {
        code: '10103',
        message: '无管理员权限',
        result:''
    },
    fileUploadFailed: {
        code: '10201',
        message: '商品图片上传失败',
        result:''
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持的文件类型',
        result:''
    }
}