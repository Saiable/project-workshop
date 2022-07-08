# searchPage前台
[搜索书签前台](https://github.com/Saiable/project-workshop/blob/search-page-frontend/README.md)
## 技术栈
- 前台基于Vue2，二次封装axios
- 后台基于go、redis

## 主要功能点
- 搜索
  - 搜索界面简洁，支持用户自定义搜索引擎
  - 丰富键盘选择及页面元素交互
  - 重写右键菜单栏，可以更换壁纸或自定义上传壁纸
- 导航
  - 支持用户添加链接至常用导航
  - 支持导航分组、排序、自定义修改
- 书签管理
  - 仿edge浏览器书签管理界面，实现在线书签管理，不用手动同步
  - 导入导出兼容市面常见浏览器

# searchPage后台
[搜索书签后台](https://github.com/Saiable/project-workshop/blob/search-page-backend/README.md)
## 技术栈
- 前台基于`vue-admin-template`二开，主要用他的根据路由动态生成侧边栏的功能
- 后台基于go
## 主要功能点
- 批量管理注册用户，支持增删改查
- 支持新增默认搜索引擎及默认导航
- 服务器资源监控可视化

# 插件版
[插件版](https://github.com/Saiable/project-workshop/blob/search-page-crx/README.md)
- 掌握chrome插件开发必要知识储备，基于本地开发要求重写`vue-cli`配置，以支持工程化开发
- 基于`web`版二开，支持用户快捷添加导航及书签




