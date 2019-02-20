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
    getZendaoCookie().then((xhr)=>{
      console.log(xhr.getAllResponseHeaders());
  });
    // chrome.storage.local.set({'value': 'test init save'}, () =>{
    //   // 通知保存完成。
    //   console.log('设置已保存');
    // });
  });
  

  

  function createdZentaoCard(sender, sendResponse){
    console.log(`it's from ${sender.tab.index}`);
    let xhr =new XMLHttpRequest();
    xhr.open("POST","http://localhost/zentao/task-create-2--0.html");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {    
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    }
    let builder =new StringBuilder();
    builder.append("project","2")
            .append("type","devel")
            .append("module","3")
            .append("assignedTo[]","t_chad")
            .append("desc","22333")
            .append("name","i_am_come_from_backgroundjs");
    xhr.send(builder.result);

  }
  function StringBuilder(text){
    this.text=text
    this.result="";
  }
  StringBuilder.prototype = {
    append:function(key,value){
       if(this.result==""){
         this.result=`${key}=${value}`
       }else{
        this.result+=`&${key}=${value}`
       }
      return this;
    }
  };
  // /**
  //  * 攔截xhr 回傳請求
  //  */
  // chrome.webRequest.onCompleted.addListener(function(details) {
  //   console.log(details)
  // }, {urls: ["<all_urls>"]});

  function getZendaoCookie(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", 'http://localhost/zentao/user-login.html', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var result = new Promise((resolve,reject)=>{
      xhr.onreadystatechange = function() {    
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          resolve(xhr);
        }
      }
    })
    let builder =new StringBuilder();
    builder.append("account","t_chad").append("password","1qaz@WSX");

    xhr.send(builder.result);
    return result;
}