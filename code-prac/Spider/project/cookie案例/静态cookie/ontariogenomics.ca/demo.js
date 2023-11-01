function run() {
    // 基础环境， 没有定义的时候，直接补空字典
    document = {}
    location = {
        reload: function () {}
    }
    var s = {},
        u, c, U, r, i, l = 0,
        a, e = eval,
        w = String.fromCharCode,
        sucuri_cloudproxy_js = '',
        S = 'ej0nTTAnLnNsaWNlKDEsMikrJzgnICsgICJic3VjdXIiLmNoYXJBdCgwKSsiYmwiLmNoYXJBdCgwKSArICAnJyArIAoiMXYiLmNoYXJBdCgwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoMHg2NikgKyAgJycgKyAKImZzZWMiLnN1YnN0cigwLDEpICsgJzcnICsgICdaZCcuc2xpY2UoMSwyKSsiN3N1Y3VyIi5jaGFyQXQoMCkrICcnICsnJysiM3AiLmNoYXJBdCgwKSArICI5Ii5zbGljZSgwLDEpICsgIjB1Ii5jaGFyQXQoMCkgKyAiYSIuc2xpY2UoMCwxKSArICAnJyArIAonZEkyJy5jaGFyQXQoMikrImMiICsgJ0p6OmQnLnN1YnN0cigzLCAxKSArU3RyaW5nLmZyb21DaGFyQ29kZSg5OSkgKyAiZiIuc2xpY2UoMCwxKSArICIiICsiYiIgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4NjYpICsgICcnICsgCiI4c3UiLnNsaWNlKDAsMSkgKyAnNicgKyAgICcnICsnJytTdHJpbmcuZnJvbUNoYXJDb2RlKDB4NjUpICsgJzgwJy5zbGljZSgxLDIpKyAnJyArJycrJzQnICsgICc0JyArICBTdHJpbmcuZnJvbUNoYXJDb2RlKDQ4KSArICI5bSIuY2hhckF0KDApICsgICcnICsnMScgKyAgICcnICsnJysnMWUnLnNsaWNlKDEsMikrIjFzZWMiLnN1YnN0cigwLDEpICsgJyc7ZG9jdW1lbnQuY29va2llPSdzJysnc3UnLmNoYXJBdCgxKSsnc3VjdWMnLmNoYXJBdCg0KSsgJ3VzdWMnLmNoYXJBdCgwKSsgJ3JzdWN1Jy5jaGFyQXQoMCkgICsnaScrJ18nKydjc3VjdXJpJy5jaGFyQXQoMCkgKyAnc3VjdXJsJy5jaGFyQXQoNSkgKyAnbycrJycrJ3UnKydkc3UnLmNoYXJBdCgwKSArJ3AnKydzdWN1cnInLmNoYXJBdCg1KSArICdvJysnJysneCcrJ3knKydzdV8nLmNoYXJBdCgyKSsnc3UnLmNoYXJBdCgxKSsndXMnLmNoYXJBdCgwKSsnc3VpJy5jaGFyQXQoMikrJ2QnKydzdV8nLmNoYXJBdCgyKSsnMCcuY2hhckF0KDApKydlc3VjdXJpJy5jaGFyQXQoMCkgKyAnc2MnLmNoYXJBdCgxKSsnNycrJ3N1YicuY2hhckF0KDIpKydhc3VjdXInLmNoYXJBdCgwKSsgJzcnKydzdWN1cjYnLmNoYXJBdCg1KSArICc5c3VjdXInLmNoYXJBdCgwKSsgIj0iICsgeiArICc7cGF0aD0vO21heC1hZ2U9ODY0MDAnOyBsb2NhdGlvbi5yZWxvYWQoKTs=';
    L = S.length;
    U = 0;
    r = '';
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (u = 0; u < 64; u++) {
        s[A.charAt(u)] = u;
    }
    for (i = 0; i < L; i++) {
        c = s[S.charAt(i)];
        U = (U << 6) + c;
        l += 6;
        while (l >= 8) {
            ((a = (U >>> (l -= 8)) & 0xff) || (i < (L - 2))) && (r += w(a));
        }
    }
    e(r);
    // console.log(document.cookie) // sucuri_cloudproxy_uuid_163a42c5e=273211a68e17a5e2ed903e9041bc66b0;path=/;max-age=86400
    cookie = document.cookie.split(';')[0]

    console.log(cookie)
    return cookie
}
run();