// ==UserScript==
// @name         Cleanddit
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Remove some annoying things
// @author       deibit
// @license      MIT
// @match        https://*.reddit.com/*
// @icon         https://reddit.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/deibit/cleanddit/main/cleanddit.js
// @downloadURL  https://raw.githubusercontent.com/deibit/cleanddit/main/cleanddit.js
// @grant        none
// ==/UserScript==

function removeElements() {
    // Remove promoted post
    let promoted = document.body.getElementsByClassName("promotedlink");
    for (var i = 0; i < promoted.length; i++) {
        promoted[i].parentElement.removeChild(promoted[i]);
    }

    // Remove popup for Notifications
    let popups = document.querySelectorAll('[id^="popup"]');
    for ( i = 0; i < popups.length; i++) {
        popups[i].parentElement.removeChild(popups[i]);
    }

    // Remove non-subscribe related post
    if (!document.location.href.includes("comments") && false) {
        const levels = 6;
        let popular = document.body.getElementsByClassName("_1qeIAgB0cPwnLhDF9XSiJM");
        for (i = 0; i < popular.length; i++) {
            let popular_item = popular[i];
            for (var j = 0; j < levels; j++) {
                if (popular_item.parentElement) {
                    popular_item = popular_item.parentElement;
                } else {
                    break;
                }
            }
            if (popular_item) {
                console.log("deleting " + popular_item);
                popular_item.parentElement.removeChild(popular_item);
            }
        }
    }

    // Remove "Create Post" popup
    let createPostPopup = document.getElementsByClassName("_3q-XSJ2vokDQrvdG6mR__k");
    if (createPostPopup.length > 0) {
        createPostPopup[0].remove();
    }
}

var MutationObserver = window.MutationObserver;
var myObserver = new MutationObserver(removeElements);
var obsConfig = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
};

myObserver.observe(document, obsConfig);
