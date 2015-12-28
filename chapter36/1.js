'use strict';

(function (F) {
  var moduleCache = {};
  var getUrl = function (moduleName) {
    return String(moduleName).replace(/\.js$/g, '') + '.js';
  };
  var loadScript = function (src) {
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.charset = 'UTF-8';
    _script.async = true;
    _script.src = src;
    document.getElementsByTagName('head')[0].appendChild(_script);
  };

  var loadModule = function (moduleName, cb) {
    var _module;

    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName];

      if (_module.status === 'loaded') {
        setTimeout(cb(_module.exports), 0);
      } else {
        _module.onload.push(cb);
      }
    } else {
      moduleCache[moduleName] = {
        moduleName: moduleName,
        status: 'loading',
        exports: null,
        onload: [cb]
      };

      loadScript(getUrl(moduleName));
    }
  };

  var setModule = function (moduleName, params, cb) {
    var _module, fn;

    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName];
      _module.status = 'loaded';
      _module.exports = cb ? cb.apply(_module, params) : null;

      while (fn = _module.onload.shift()) {
        fn(_module.exports);
      }
    } else {
      cb && cb.apply(null, params);
    }
  };

  F.module = function () {
    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    var deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [];
    var url = args.length ? args.pop() : null;
    var params = [];
    var depsCount = 0;
    var len;

    if (len = deps.length) {
      for (var i = 0; i < len; i++) {
        (function (i) {
          depsCount++;
          loadModule(deps[i], function (mod) {
            params[i] = mod;
            depsCount--;

            if (depsCount === 0) {
              setModule(url, params, callback);
            }
          });
        })(i);
      }
    } else {
      setModule(url, [], callback);
    }
  };


})((function () {
  return window.F = {};
})());