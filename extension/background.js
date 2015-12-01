
console.log("Background script started");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    var options = {
        format: "png",
        quality: 75,
    };

    console.log("Received message from", message, sender);

    // Capture API https://developer.chrome.com/extensions/tabs#method-captureVisibleTab
    chrome.tabs.captureVisibleTab(null, options, function (dataUrl) {

        console.log("Image", dataUrl);

        var newMessage = {
            selection: message.selection,
            url: dataUrl,
        };

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, newMessage, function (response) {
            console.log(response);
          });
        });

    });
});

// Inject the scripts to page
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "execute.js" });
    // chrome.tabs.insertCSS(null, { file: "content-style.css" });
});
