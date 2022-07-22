(function () {
    'use strict';

    class Pointer {
        constructor(x, y) {
            // ts比较特殊，在使用必须先声明类型
            this.x = 1;
            this.y = 2;
            // this.x = x
            // this.y = y
        }
    }
    const res = new Pointer(100, 200);
    console.log(res, res.x);

})();
//# sourceMappingURL=bundle.js.map
