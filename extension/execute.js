
// Must be declared at web_accessible_resources in manifest.json
var iframe = document.createElement("iframe");

// Set the styles for iframe
iframe.frameBorder    = 0;
iframe.style.border   = "none";
iframe.style.position = "fixed";
iframe.style.top      = "0";
iframe.style.right    = "0";
iframe.style.height   = "100%";
iframe.style.width    = "100%";
iframe.style.zIndex   = 99999999;

var elName = "qs-screenshot-extension";
var refEl = document.getElementById(elName);

iframe.src = chrome.runtime.getURL("index.html");
iframe.id = elName;

if (!refEl) {

    iframe.setAttribute("id", elName);
    document.body.appendChild(iframe);
}
