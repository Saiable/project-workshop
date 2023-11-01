// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.cnblogs.com/waw/p/17308144.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cnblogs.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var new_setInterval = setInterval;
    window.setInterval = function (a, b) {
        if (a.toString().indexOf("debugger") != -1) {
            return null;
        }
        new_setInterval(a, b);
    }

})();