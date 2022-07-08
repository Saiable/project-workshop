console.log('this is background main.js');

// 可以用来更换插件的图标
function setIcon() {
    chrome.browserAction.setIcon({
        path: 'assets/images/icon48.png',
    });
}

// 可以用来设置插件图标上显示的文字
function setBadgeText() {
    chrome.browserAction.setBadgeText({text: ""})
}

// 设置badge的背景颜色。
function setBadgeBackgroundColor() {
    chrome.browserAction.setBadgeBackgroundColor({
        color: [255, 255, 255, 255]
    });
}


// 监听来自content-script的消息
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log('收到来自content-script的消息：');
//     console.log(request, sender, sendResponse);
//     // setIcon();
//     // setBadgeText();
//     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
// });