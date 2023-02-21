(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  // 我们希望重写数组中的部分方法
  var oldArrayProto = Array.prototype; // newArraryProto.__proto = oldArrayProto

  var newArrayProto = Object.create(oldArrayProto); // 以oldArryarProto对象为原型对象，新建一个newArraryProto
  // 找到所有的变异方法

  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']; // concact slice都不会改变原数组

  methods.forEach(function (method) {
    // arr.push(1,2,3)
    newArrayProto[method] = function () {
      var _oldArrayProto$method;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 这里重写了数组方法
      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args)); // 内部调用原来的方法，一般称为函数的劫持（切片编程(切面编程)：自己写个功能，把以前的功能塞进去，外面可以做一些自己的事，aop）
      // 我们需要对新增的数据，再次进行劫持


      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          // arr.unshift(1,2,3)
          inserted = args;
          break;

        case 'splice':
          // arr.splice(0, 1, {a:1}, {a:1})
          inserted = args.slice(2);
          break;
      } // console.log('新增的内容', inserted)


      if (inserted) {
        // 对新增的内容再次进行观测
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // data.__ob__ = this
      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false
      });

      if (Array.isArray(data)) {
        // 这里我们可以重写数组的7个变异方法（可以修改数组本身）
        data.__proto__ = newArrayProto;
        this.observeArray(data); // 递归处理数组中的对象
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 循环对象，对属性依此劫持
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);

    return Observer;
  }(); // 向外导出该方法，供单独使用


  function defineReactive(target, key, value) {
    // 闭包
    observe(value); // observe内部对value进行判断了，是个对象，会再次创建Observer实例，再次调用walk方法，劫持每个属性

    Object.defineProperty(target, key, {
      get: function get() {
        // 取值的时候，会执行get
        // console.log('key', key)
        return value;
      },
      set: function set(newValue) {
        // 修改值的时候，会执行set
        if (value == newValue) return;
        value = newValue;
      }
    });
  }
  function observe(data) {
    // console.log(data)
    // 对data类型进行判断
    if (_typeof(data) !== 'object' || data == null) {
      return; // 只对对象进行劫持
    } // 如要考虑到一个对象已经被劫持的情况
    // 如果一个对象已经被劫持过了，那么就不需要再被劫持
    // 可以添加一个实例，用实例来判断是否被劫持过（应该是用实例身上的属性）


    if (data.__ob__ instanceof Observer) {
      return data.__ob__; // 如果被代理过了，直接返回它的实例
    }

    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      // vm.name
      get: function get() {
        return vm[target][key]; // vm.name实际上是去vm._data.name上去取值了
      },
      set: function set(newValue) {
        vm[target][key] = newValue; // 这性能的确不太好，每一个`key`都加了一层
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data; // 对数据进行劫持,vue2中采用了defineProperty
    // 观测之前，把data放一份到vm._data身上

    vm._data = data; // 定义一个方法obeserve观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理

    observe(data); // 将vm._data用vm来代理，简化用户写法

    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 匹配标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配到的分组，是一个标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配到的分组，是结束标签名

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/;

  function parsetHTML(html) {
    // 每解析一个标签，就把它从字符串中删除掉
    function start(tag, attrs) {
      console.log('开始标签', tag, attrs);
    }

    function chars(text) {
      console.log('文本', text);
    }

    function end(tag) {
      console.log('结束标签', tag);
    }

    function advance(n) {
      // 截取
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen); // 结果是一个数组
      // console.log(start)

      if (start) {
        // 匹配到了，把结果（数组）组成一个对象
        var match = {
          tagName: start[1],
          // 标签名
          attrs: []
        };
        advance(start[0].length); // 根据匹配到的字符的长度，进行删除
        // console.log(match)
        // console.log(html)

        var attr, _end;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 如果不是开始标签的结束，就一直匹配，并且每次匹配都把匹配到的结果存起来
          advance(attr[0].length); // 每次匹配完，再把匹配过的字符去掉

          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
        } // console.log(match)


        if (_end) {
          // 如果匹配到了end，也应该删除
          advance(_end[0].length);
        }

        return match;
      }

      return false; // 不是开始标签，返回false
    }

    while (html) {
      // debugger
      // vue2中，html最开始一定是一个< 
      // 如果textEnd为0，说明是一个开始标签或者结束标签
      // 如果textEnd>0，说明就是文本的结束位置
      var textEnd = html.indexOf('<'); // 如果索引为0，则说明是个标签，开始标签取完了，再去取尖角号，取到的是文本结束的位置

      if (textEnd == 0) {
        var startTagMatch = parseStartTag(); // 开始标签的匹配结果

        if (startTagMatch) {
          // 解析到的开始标签
          start(startTagMatch.tagName, startTagMatch.attrs); // 把匹配到的开始标签的内容，传出去

          continue; // console.log(html) // 截取完之后，可能还是开始标签
        } //如果不是开始标签，那么就是结束标签


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      if (textEnd >= 0) {
        // 解析到的文本
        var text = html.substring(0, textEnd); // 文本内容

        if (text) {
          chars(text);
          advance(text.length); // console.log(html)
        }
      }
    }

    console.log(html);
  } // 对模板进行编译处理


  function compileToFunction(template) {
    console.log(template); // 1.将template转化成ast抽象语法树

    parsetHTML(template); // 2.生成render方法（返回的结果，就是虚拟dom）
    // console.log(template)
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);

      if (options.el) {
        // 看是否有el配置项
        vm.$mount(options.el); // 实现数据的挂载
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var ops = vm.$options;

      if (!ops.render) {
        // 先查找render函数
        var template;

        if (!ops.template && el) {
          // 没有template配置项，但是有el配置项
          template = el.outerHTML; // 就用el的配置项，outHTML返回的是匹配到自身的dom元素
        } else {
          // // 如果既有template,又有el，就用template配置项作为模板
          if (el) {
            template = ops.template;
          }
        } // 其他情况的分支考虑
        // console.log(template)
        // 最终如果获取到模板


        if (template) {
          // 这里需要对模板进行编译
          var render = compileToFunction(template); // 将编译后的结果给render函数

          ops.render = render;
        }
      }

      ops.render; // 有render就直接调用render
    };
  }

  function Vue(options) {
    // options就是用户的选项
    // 拿到用户的options，做一下初始化
    this._init(options);
  } // 给Vue增加init方法


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
