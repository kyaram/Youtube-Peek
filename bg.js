chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {cancel: true};
    },
    {
    	//Block all ads so it will not show on iframe
    	urls: ["*://s.youtube.com/api/stats/qoe?*", "*://*.googlesyndication.com/*", "*://*.youtube.com/get_midroll_info?*", "*://*.googleadservices.com/*", "*://*.youtube.com/ptracking?*", "*://*.youtube.com/mac_204?*", "*://*.doubleclick.net/*", "*://*.googleadservices.com/*", "*://*.youtube.com/api/stats/ads?*", "*://clients1.google.com/*", "*://s0.2mdn.net/*", "*://*.youtube.com/annotations_invideo?*", "*://*.youtube.com/youtubei/*", "*://*.youtube.com/get_video_metadata?*" ]
    },
    ["blocking"]
);
