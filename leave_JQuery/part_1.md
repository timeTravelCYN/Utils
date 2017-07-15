### 1.查找搜索选择器

按ID查找

``` JavaScript
  $("#test") => document.getElementById('test')
```

按class名查找

``` JavaScript
  $(".test") => document.getElementById('test')
```

按标签名查找：

``` JavaScript
  $('div')  =>  document.getElementsByTagName('div')
```

统一查找

``` JavaScript
$('#test')  =>
document.querySelector('#test')

$('#test div')  =>  document.querySelectorAll('#test div')

$('#test').find('span')  => document.querySelectorAll('#test span');
```