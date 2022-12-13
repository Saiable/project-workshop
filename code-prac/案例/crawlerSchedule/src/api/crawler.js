import { request } from "@/utils/request";

// 添加爬虫
export function addSpider(data) {
  return request({
    method: "post",
    url: "/spider/add",
    data,
  });
}

// 删除爬虫
export function deleteSpider(data) {
  return request({
    method: "post",
    url: "/spider/delete",
    data,
  });
}

// 添加所有爬虫
export function addAllSpider(data) {
  return request({
    method: "post",
    url: "/spider/add_all",
    data,
  });
}

// 删除所有爬虫
export function deleteAllSpider(data) {
  return request({
    method: "post",
    url: "/spider/delete_all",
    data,
  });
}

// 暂停爬虫
export function pauseSpider(data) {
  return request({
    method: "post",
    url: "/spider/pause",
    data,
  });
}

// 恢复爬虫
export function resumeSpider(data) {
  return request({
    method: "post",
    url: "/spider/resume",
    data,
  });
}

// 获取所有爬虫
export function getAllSpider() {
  return request({
    url: "/spider/all",
  });
}

// 获取所有爬虫job
export function getAllCounter() {
  return request({ url: "/counter/all" });
}

// 获取所有爬虫文件的近几天的采集数据
export function getCounterByDays(nums) {
  return request({
    url: `/counter/all/days/${nums}`,
    // params: {
    //     query: params
    // }
  });
}

// 获取单个爬虫文件的近几天的采集数据
export function getCounterByName(name, nums) {
  return request({
    url: `/counter/all/days/${name}/${nums}`,
    // params: {
    //     query: params
    // }
  });
}

// 获取所有爬虫job
export function getAllAdmin() {
  return request({ url: "/admin/all" });
}

// 爬虫告警，获取7天内所有爬虫数量小于7的job
export function getAlarmAdmin() {
  return request({
    url: "/admin/alarm",
  });
}
