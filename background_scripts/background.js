chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    // 可以针对sender做一些白名单检查
    console.log(request)
    switch(request.type) {
       case 'MsgFromPage':
          createdZentaoCard(sender, sendResponse);
          break;
    }

  });
  
  chrome.runtime.onInstalled.addListener(()=> {
    console.log("back ground init");
    chrome.storage.local.set({'value': 'test init save'}, () =>{
      // 通知保存完成。
      console.log('设置已保存');
    });
  });
  

  function createdZentaoCard(sender, sendResponse){
    console.log(`it's from ${sender.tab.index}`);
       chrome.storage.local.get('value',(items)=>{
          console.log(items);
          sendResponse({tyep: 'MsgFromChrome', msg: 'Hello, I am chrome extension~'});
       })
  }
 
  // /**
  //  * 攔截xhr 回傳請求
  //  */
  // chrome.webRequest.onCompleted.addListener(function(details) {
  //   console.log(details)
  // }, {urls: ["<all_urls>"]});