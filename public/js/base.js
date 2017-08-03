var eventToUse = 'click';

function s(element) {
  $(element).transit({
    scale: .8
  }, 150, 'easeInExpo').transit({
    scale: 1
  }, 300, 'easeOutExpo')
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}

function getMins(jj) {
  //console.log(jj);
  return (Math.floor((new Date().getTime() - jj) / 1000 / 60));
}

function getSecs(jj) {
  //console.log(jj);
  return (Math.floor((new Date().getTime() - jj) / 1000) - (getMins(jj) * 60));
}

function s5(element) {
  $(element).transit({
    background: 'red'
  }, 100).transit({
    background: '#212121'
  }, 150)
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}

function s6(element) {
  $(element).transit({
    background: 'red'
  }, 100).transit({
    background: '#212121'
  }, 150)
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}

function playSound(x) {
  $(x).trigger('play')
}

function numericKeyPressGlow(element) {
  $(element).transit({
    background: 'black',
    color: '#FFEB3B'
  }, 100).transit({
    color: 'black',
    background: '#FFEB3B'
  }, 150)
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}

function s2(element) {
  $(element).transit({
    scale: 1.5
  }, 150).transit({
    scale: 1
  }, 300)
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}
function fadeIn(element) {
  $(element).css('opacity', '0')
  $(element).show().transit({
    opacity: 1
  }, 200)
}
function fadeOut(element) {
  $(element).transit({
    opacity: 0
  }, 200).hide();
}
function f1(element) {
  $(element).transit({
    fontSize: '1.8rem'
  }, 150).transit({
    fontSize: '1.2rem'
  }, 300)
  //$(element).transit({borderBottomWidth:6}, 50).transit({borderBottomWidth:3}, 100);
}


function p(element) {

  //$(element).transit({scale:.8}, 50).transit({scale:1}, 100)
  // $(element).transit({
  //     borderBottomWidth: 0
  // }, 50).transit({
  //     borderBottomWidth: 5
  // }, 150);

  $(element).transit({
    borderBottomWidth: 0
  }, 150, 'easeInExpo').transit({
    borderBottomWidth: 5
  }, 300, 'easeOutExpo')

}

function makeTemplates() {
  var templateName = '';
  $('script[type="text/x-jquery-tmpl"]').each(function (index, item) {
    templateName = $(item).attr("id");
    $.template(templateName.replace("Template", ""), $(item).html());
  });
}

function br(text) {
  var x = text.replace(/ /g, '<br/>');
  x = x + ''; //'roll<br/>maal';
  //log(x);
  return x;
}

function rb(element, template, data, button, cb, rcb) {
  render(element, template, data, function () {
    if (rcb)
      rcb(button);

    bind(element + ' ' + button, function () {
      var r = $(this).tmplItem().data;
      cb($(this), r);
      //logClicks();
    });
  })
}

function rbs(element, template, data, button, cb, rcb) {
  render(element, template, data, function () {
    if (rcb)
      rcb(button);

    bind(element + ' ' + button, function () {
      var r = JSON.parse(JSON.stringify($(this).tmplItem().data));
      cb($(this), r);
      //logClicks();
    });
  })
}

function render(element, template, data, cb) {
  $(element).html('');
  $.tmpl(template, data).appendTo(element);
  if (cb)
    cb($(element))
}

function bi(element, cb, eventName) {
  //log('bind ' + element);

  $(element).unbind().bind(eventName ? eventName : eventToUse, function () {
    var jj = $(this).tmplItem().data;
    cb(this, jj);
    //logClicks();
  });
}

function bind(element, func, eventName) {
  //log('bind ' + element);
  if (eventName)
    $(element).unbind().bind(eventName, func);
  else
    $(element).unbind().bind(eventToUse, func);
}

var docCount = 0;

function logClicks(func) {
  return;
  // docCount += 1;
  // console.log('click ' + docCount);
}

function log(message) {
  console.log(message);
}

function getValues(arr, id, source) {
  for (var i = 0; i < arr.length; i++) {
    var j = arr[i];

    j.data = JSLINQ(master.settings[source]).Where(function (x) {
      return x['id'] == j['id'];
    }).items[0];
  }

  return JSON.parse(JSON.stringify(arr));
}

function find(arr, sourceId, targetId) {
  return function () { };
}

function slideIn(element, func) {
  $(element).show().transition({
    x: w * -1
  }, func);
}

function slideOut(element, func) {
  $(element).show().transition({
    x: w * 1
  }, func);
}

function swapIn(elementFrom, elementTo, func) {
  $(elementTo).show().transition({
    x: w * -1
  }, function () {
    $(elementFrom).transition({
      x: w * 1
    }, 10, function () {
      $(this).hide();
    });

    func();
  });
}

function createMap(d) {
  if (d.displayMap == undefined) {
    var jj;

    if (d.data == undefined)
      jj = d;
    else {
      jj = d.data[0];
    }

    var map = [];
    for (var propt in jj) {
      map.push({
        key: propt,
        w: 20,
        align: 'left'
      });
    }
  } else {
    map = d.displayMap;
  }

  return map;
}

function swapOut(elementFrom, elementTo, func) {
  $(elementTo).show().transition({
    x: w * -1
  }, 10, function () {

    $(elementFrom).transition({
      x: w * 1
    }, function () {
      $(this).hide();
    });

    func();
  });
}

function hideKeyboard() {
  document.activeElement.blur();
  $("input").blur();

  //if (isiOS) {
  //    document.activeElement.blur();
  //    $("input").blur();
  //} else {
  try {
    Android.HideKeyboard();
  } catch (e) { }
}

function logResult(d) {
  log(d);
}

function preloadImages(arr) {
  var newimages = [],
    loadedimages = 0
  var postaction = function () { }
  var arr = (typeof arr != "object") ? [arr] : arr

  function imageloadpost() {
    loadedimages++
    if (loadedimages == arr.length) {
      postaction(newimages) //call postaction and pass in newimages array as parameter
    }
  }
  for (var i = 0; i < arr.length; i++) {
    newimages[i] = new Image()
    newimages[i].src = '../dishes/' + arr[i] + '.jpg';
    newimages[i].onload = function () {
      imageloadpost()
    }
    newimages[i].onerror = function () {
      imageloadpost()
    }
  }
  return { //return blank object with done() method
    done: function (f) {
      postaction = f || postaction //remember user defined callback functions to be called when images load
    }
  }
}

function executeWeb(command, requestData, success, fail) {
  executeM(command, 'POST', requestData, success, fail, 10000);
}

function executeM(command, request_path, requestData, success, fail, timeout) {
  return executeInternal(appUrl, command, request_path, requestData, success, fail, timeout);
}

function executeKDS(command, requestData, success, fail) {
  executeInternal(kdsUrl, command, 'POST', requestData, success, fail, 10000);
}

function executePi(command, requestData, success, fail) {
  executeInternal(appUrl, command, 'POST', requestData, success, fail, 10000);
}

function executeLongWait(command, request) {
  return new Promise(function (res, rej) {
    executeInternal(appUrl, command, 'POST', request, res, rej, 180000);
  });
}

function execute(command, request) {
  return new Promise(function (res, rej) {
    executeInternal(appUrl, command, 'POST', request, res, rej, 10000);
  });
}

function executeInternal(url, command, request_path, requestData, success, fail, timeout) {
  fail = ((fail == undefined) ? function () {
    //handle error
  } : fail);

  //$.ajax({
  //    type: "POST",
  //    url: appUrl + command,
  //    data: requestData,
  //    dataType: "json",

  //    timeout: timeout == undefined ? 10000 : timeout, // in milliseconds
  //    success: success,
  //    error: fail
  //});

  $.ajax({
    type: request_path,
    url: url + command,
    data: JSON.stringify(requestData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    timeout: timeout == undefined ? 30000 : timeout, // in milliseconds
    success: success,
    error: fail
  });
}

function isEmpty(parameter) {
  for (var key in parameter) {
    if (parameter.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function round(x, digits) {
  return parseFloat(x.toFixed(digits))
}

$.fn.scrollTo = function (target, options, callback) {
  if (typeof options == 'function' && arguments.length == 2) {
    callback = options;
    options = target;
  }
  var settings = $.extend({
    scrollTarget: target,
    offsetTop: 80,
    duration: 500,
    easing: 'swing'
  }, options);
  return this.each(function () {
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({
      scrollTop: scrollY - 40
    }, parseInt(settings.duration), settings.easing, function () {
      if (typeof callback == 'function') {
        callback.call(this);
      }
    });
  });
}

function merge(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}


// function padLeft(nr, n, str){
//     return Array(n-String(nr).length+1).join(str||'0')+nr;
// }
//or as a Number prototype method:
// Number.prototype.padLeft = function (n,str){
//     return Array(n-String(this).length+1).join(str||'0')+this;
// }
c = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}

Number.prototype.padLeft = function (len, chr) {
  var self = Math.abs(this) + '';
  return (this < 0 && '-' || '') +
    (String(Math.pow(10, (len || 2) - self.length))
      .slice(1).replace(/0/g, chr || '0') + self);
}
var getNDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  // if (today.getHours() < time) {
  //   dd--
  // }

  if (dd < 10)
    dd = '0' + dd;
  if (mm < 10)
    mm = '0' + mm;
  nDate = yyyy + '' + mm + '' + dd;
  return nDate;

}
