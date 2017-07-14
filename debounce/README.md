# 为什么要函数去抖
1. window的resize、scroll
2. mousedown、mousemove
3. keyup、keydown
这些都属于高频事件，对于前端来说，性能无疑是一个巨大的要素。如果毫无节制的让这些事件高频出发，可能会触发页面的reflow。


### 防抖的原理:

  事件触发在N秒之后执行，如果在一个N秒内又触发了这个事件，就重新计算这个N秒。总之，就是等触发完事件且N秒内不再触发，才执行相应逻辑。

```javascript
  //第一版
  function debounce(func, wait) {
    var timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    }
  }
```

### 此版本问题:

改变了this指向。

```javascript
  //第二版
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context);
      }, wait);
    }
  }
```
此时this指向已经正确。

### event对象
在使用了debounce之后，e变为undefined;

```javascript
  //第三版
  function debounce(func, wait) {
    var timeout;
    return function (...args) {
      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  }
```
### 立即执行
需求变更，现在希望立即执行函数，然后停止触发n秒后，再重新触发。

```javascript
  //第四版
  function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        console.log(1111);
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait);
      }
    }
  }
```

其实理解这一版具体在immediate之后打印一下timeout就懂了。

### 返回值

```javascript
  //第五版
  function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
  }
```

此时注意一点，就是 getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。

### 取消debounce
如果间隔过长，在immediate模式下，只能等相应的秒数之后才能继续触发，现实现添加一个取消按钮，然后立马又可以继续触发。


``` JavaScript 
// 第六版
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```