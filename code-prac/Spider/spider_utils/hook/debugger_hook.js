var ins = Function.prototype.constructor;

Function.prototype.constructor = function (params) {
    if(params != "debugger") {
        return ins(params);
    }
    return function() {};
}