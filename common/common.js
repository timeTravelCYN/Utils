/*ua检测类*/
var bbtree = bbtree || {};
bbtree.appInfo = (function (win, doc) {
  var userAgentStr = navigator.userAgent,
    bbtreeStr = (userAgentStr.toLowerCase().indexOf('bbtree') >= 0) ? /bbtree_[MPT](\/\d\.\d\.\d|\/\d\.\d|\/\d)/.exec(userAgentStr)[0] : '',
    bbtreeArr = bbtreeStr.split('/'),
    version_ = bbtreeArr[1] || '0.0.0',
    appType_ = bbtreeArr[0].split('_')[1] || '';
  return {
    /*版本号*/
    version: version_,
    /*app类型*/
    appType: appType_,
    /**
     * @param  {[type=Boolean]}
     * @return {使用场景是否在bbtreeapp中,true为在,false为不在}
     */
    isInApp: (function () {
      if (userAgentStr.toLowerCase().indexOf('bbtree') >= 0) {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {返回平台类型 'ios' 'android' 'others' 均为string类型}
     */
    platForm: (function () {
      if (!!userAgentStr.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return 'ios';
      } else if (userAgentStr.indexOf('Android') > -1 || userAgentStr.indexOf('Linux') > -1) {
        return 'android';
      } else {
        return 'others';
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {是否为ios端,true为是,false为否}
     */
    isIos: (function () {
      if (!!userAgentStr.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {是否为安卓端,true为是,false为否}
     */
    isAndroid: (function () {
      if (userAgentStr.indexOf('Android') > -1 || userAgentStr.indexOf('Linux') > -1) {
        return true;
      } else {
        return false
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否大于传入版本号，传入的参数类型为string}
     */
    isVersionLager: function (ver) {
      var oldVer = ver;
      var nowVer = version_;
      if (this.isInApp && nowVer > oldVer) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否小于传入版本号，传入的参数类型为string}
     */
    isVersionLess: function (ver) {
      var oldVer = ver;
      var nowVer = version_;
      if (this.isInApp && nowVer < oldVer) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否等于传入版本号，传入的参数类型为string}
     */
    isVersion: function (ver) {
      var nowVer = ver;
      var oldVer = version_;
      if (this.isInApp && oldVer == nowVer) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否为家长端(如果不在APPwebview里使用统一返回false)}
     */
    isParentApp: (function () {
      if (appType_ == 'P') {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否为教师端(如果不在APPwebview里使用统一返回false)}
     */
    isTeacherApp: (function () {
      if (appType_ == 'T') {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {当前版本是否为园长端(如果不在app里使用统一返回false)}
     */
    isMasterApp: (function () {
      if (appType_ == 'M') {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {当前浏览器是否为微信内置}
     */
    isWechat: (function () {
      if (userAgentStr.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    })(),
    /**
     * @param  {[type=Boolean]}
     * @return {当前浏览器是否为QQ内置}
     */
    isQQ: function () {
      if (userAgentStr.toLowerCase().match(/QQ/i) == "qq") {
        return true;
      } else {
        return false;
      }
    }
  }
})(window, document)
//弹框类
var Alert = function (data) {
  if (!data) return;
  this.paralist = data;
  //创建弹窗面板
  this.panel = document.createElement('div');
  this.container = document.createElement('ul');
  this.triangle = document.createElement('div');
  //为按钮添加类
  this.panel.className = 'com-dialog';
  this.triangle.className = 'triangle';
  this.container.id = 'alertList';
}
Alert.prototype = {
  init: function () {
    for (var i = 0; i < this.paralist.length; i++) {
      li = document.createElement('li');
      li.innerHTML = this.paralist[i].msg;
      this.container.appendChild(li);
    }
    this.panel.appendChild(this.container);
    this.panel.appendChild(this.triangle);
    document.body.appendChild(this.panel);
    this.bindEvent();
  },
  bindEvent: function () {
    var that = this;
    $('#alertList li').each(function (i) {
      $(this).tap(function (e) {
        that.paralist[i].fn.apply(null, that.paralist[i].args);
      })
    });
  },
  show: function () {
    this.panel.style.display = 'block';
  },
  hide: function () {
    this.panel.style.display = 'none';
  },
  position: function (h) {
    $(this.panel).css('top', '' + h + 'px');
  }
}
/*获取参数*/
function getUrlParam(paras) {
  var url = window.location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  var i, j;
  for (i = 0; j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if (returnValue && returnValue.indexOf('#') > -1) {
    returnValue = returnValue.split('#')[0];
  }
  if (typeof (returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
};
//获取URL参数
function getQuery(){
  let qs = location.search.length>0?location.search.substring(1):'',
      args = {},
      items = qs.length?qs.split("&"):[],
      item = null,
      name = null,
      value = null,
      i=0,
      len = items.length;
      for(i=0;i<len;i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
          args[name] = value;
        }
      }
    return args;
}