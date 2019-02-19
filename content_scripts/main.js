function tobackground(){
    var targetExtensionId = "moflmmbflccopdfhopgpfpjlkifljmnc"; // 插件的ID
    chrome.runtime.sendMessage(targetExtensionId, {type: 'MsgFromPage', msg: 'Hello, I am page~'}, function(response) {
    console.log(response);
});
}