# 函数节流

### 节流的原理
如果你持续触发事件，每隔一段时间，事件只执行一次。
讲一个最近频繁用到的场景吧，在做滑动到底部自动加载更多的时候，要去判断父元素的 scrollTop 和 height的和是否大于 子元素的height - 某个比较小的值，那么scroll会一直去做这个判断，但实际上前N多次的判断都是无效的，此时还没有滑动到底部，为了性能，我们采用节流，每隔300毫秒去检测一次。

根据首次是否执行以及结束后是否执行，效果及实现方式都有所不同。

**用leading代表首次是否执行，用trailing代表结束后是否再一次执行。**

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

### 使用时间戳

思路:

当触发事件的时候，取出当前的时间戳，然后减去之前的时间戳(一开始为0)，如果大于设置的事件周期，就执行函数，然后更新时间戳为当前时间，如果小于，就不执行。

```javascript
// 第一版
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
    var now = new Date();
    context = this;
    args = arguments;
    if(now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}
```

### 使用定时器

思路:


  当触发事件的时候，设置一个定时器，再出发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。

  ``` javascript 
  function throttle(func, wait) {
    var context;
    var timeout;

    return function() {
      context = this;
      args = arguments;
      if(!timeout) {
        timeout = setTimeout(function() {
          func.apply(context, args);
          timeout = null;
        }, wait)
      }
    }
  }
  
  ```

