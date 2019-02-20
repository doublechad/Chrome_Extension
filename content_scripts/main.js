window.onload=function(){
    var target =document.getElementsByClassName('window')[0];
    var button =document.createElement('button');
    button.innerHTML="擴展測試";
    if(target){
        target.appendChild(button);
    }
    button.addEventListener("click",tobackground);
}

function tobackground(){
    var targetExtensionId = "dmfafmobagdhmlnchikglfhkjmmbinci"; // 插件的ID

    chrome.runtime.sendMessage(targetExtensionId, {type: 'MsgFromPage', msg: 'Hello, I am page~'}, function(response) {
    console.log(response);
});

}

(function() {
    var XHR = XMLHttpRequest.prototype;
    // Remember references to original methods
    var open = XHR.open;
    var send = XHR.send;

    // Overwrite native methods
    // Collect data: 
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    // Implement "ajaxSuccess" functionality
    XHR.send = function(postData) {
        this.addEventListener('load', function() {
            /* Method        */ this._method
            /* URL           */ this._url
            /* Response body */ this.responseText
            /* Request body  */ postData
            var response ={
                "method":this._method,
                "url":this._url,
                "responseText":this.responseText,
                "postData":postData
            };
            console.log(response);
        });
        return send.apply(this, arguments);
    };
})();


 