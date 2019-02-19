chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    // 可以针对sender做一些白名单检查
    // sendResponse返回响应
    if (request.type == 'MsgFromPage') {
       console.log(sender);
      sendResponse({tyep: 'MsgFromChrome', msg: 'Hello, I am chrome extension~'});
    }
  });
  