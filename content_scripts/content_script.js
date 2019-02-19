/*
在Header載入main.js
*/ 
const script = document.createElement('script');
script.setAttribute("src", chrome.extension.getURL('/content_scripts/main.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);

