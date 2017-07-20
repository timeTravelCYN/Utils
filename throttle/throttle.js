var count = 1;
var container = document.getElementById('container');

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

function getUserAction(e) {
  container.innerHTML = count++;
}



var serUserAction = throttle(getUserAction, 1000)

container.onmousemove = serUserAction;

document.getElementById('cancel').addEventListener('click', function() {
  serUserAction.cancel();
}, false)