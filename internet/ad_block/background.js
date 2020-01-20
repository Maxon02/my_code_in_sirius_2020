"use strict"
 
var enabled = true;


// Check on sochisirius.ru and ngs.ru
const badDomains = [
        "doubleclick.com",
        "mc.yandex.ru",
        "google-analytics.com",
        "googletagmanager.com",
        "an.yandex.ru",
        "reklama.ngs.ru",
        "ads.adfox.ru",
        "www.tns-counter.com",
];
 
let leetRequestFilter = function(details) {
        if (!enabled) return {};
 
        
        let block = false; 
        const parsedUrl = new URL(details.url);
        
        for(let i = 0; i < 8; i++){
                if(parsedUrl.host.endsWith(badDomains[i]))
                        block = true;
        }
        if(block)
                console.log(parsedUrl.host);
        const response = {cancel: block};
        return response;
}
 
chrome.webRequest.onBeforeRequest.addListener(
        leetRequestFilter,
        {urls: ["http://*/*", "https://*/*"]},
        ["blocking"]  // Nothing continues until we decide to proceed.
);
