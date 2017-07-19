# 深浅拷贝

### 数组的浅拷贝
  可以利用slice、concat返回一个新数组的特性来实现拷贝。

``` JavaScript
var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]
```
但是如果向上述数组的元素为对象或者数组的话，克隆的其实并不彻底，也就是我们所说的:  浅拷贝。
其实此处的克隆只是拷贝了数组或者对象的引用。

### 数组的深拷贝
先来一个简单粗暴的方法
``` javascript
var new_arr = JSON.parse( JSON.stringify(arr) );
```

但是此方法不可以拷贝函数

``` javascript
var arr = [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}]

var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);
```


### 浅拷贝的实现
抛去上面所说的技巧类，自己实现一个~
``` javascript
var shallowCopy = function(obj) {
  // 只拷贝对象
  if(typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
      }
  }
  return newObj;
}
```


### 深拷贝的实现

如果是对象，在递归调用一遍，就是深拷贝了~

``` javascript 
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

之前的还有另一种方法
``` javascript
//深拷贝
function deepCopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        var n = new Function("return " + o.toString())();
        return n
    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}
```

深拷贝因为调用了递归，性能肯定不如浅拷贝。第二种深拷贝的方法可以说是个反面教材了..不管三七二十一..只要你是数组的元素，先给我在调用一遍..
深浅拷贝要根据根据场景区分，性能这方面的要求就见仁见智了。但是从第二种方法可以得出，我们平时还是有必要..去关注一下性能方面的问题的..尤其是对于函数的递归，数组方法的调用等等。