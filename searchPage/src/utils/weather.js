export function weather() {
    window.WIDGET = {
        "CONFIG": {
            "layout": "2",
            "width": "400",
            "height": "295",
            "background": "5",
            "dataColor": "FFFFFF",
            "borderRadius": "5",
            "key": "c0de456ad3ff436f83ace3bf82b98b5d"
        }
    }
    //引用线上插件
    const s = document.createElement('script')
    s.type = 'text/JavaScript';
    s.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.body.appendChild(s);

    // 引用本地插件
    //(function (d) {
    //    var c = d.createElement('link');
    //    c.rel = 'stylesheet';
    //    c.href = '../../../static/weather/he-standard.css';
    //    // c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0'
    //    var s = d.createElement('script');
    //    s.src = '../../../static/js/he-standard.js';
    //    // s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0'
    //    var sn = d.getElementsByTagName('script')[0];
    //    sn.parentNode.insertBefore(c, sn);
    //    sn.parentNode.insertBefore(s, sn);
    //})(document);

}

export function linkLocalWeather() {
    window.WIDGET = {
        "CONFIG": {
            "layout": "2",
            "width": "400",
            "height": "295",
            "background": "5",
            "dataColor": "FFFFFF",
            "borderRadius": "5",
            "key": "c0de456ad3ff436f83ace3bf82b98b5d"
        }
    }

    var c = document.createElement('link');
    c.rel = 'stylesheet';
    c.href = '../../../../static/weather/he-standard.css';
    // c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0'
    var s = document.createElement('script');
    s.src = '../../../../static/weather/he-standard.js';
    // s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0'
    var sn = document.getElementsByTagName('script')[0];
    sn.parentNode.insertBefore(c, sn);
    sn.parentNode.insertBefore(s, sn);
}