(function () {
    'use strict';

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    function toUpperCase(target, key) {
        var val = '';
        Object.defineProperty(target, key, {
            get: function () {
                return val.toUpperCase();
            },
            set: function (newVal) {
                val = newVal;
            }
        });
    }
    function double(num) {
        return function (target, key) {
            var val = target[key];
            Object.defineProperty(target, key, {
                get: function () {
                    return val * 2;
                }
            });
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'sai';
        }
        Person.age = 18;
        __decorate([
            toUpperCase
        ], Person.prototype, "name", void 0);
        __decorate([
            double()
        ], Person, "age", void 0);
        return Person;
    }());
    var p = new Person();
    console.log(p.name, Person.age);

})();
//# sourceMappingURL=bundle.js.map
