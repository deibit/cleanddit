// ==UserScript==
// @name         Cleanddit
// @namespace    http://tampermonkey.net/
// @version      0.10
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
    const unwanted = ["Popular", "Because", "Similar"];

    if (!document.location.href.includes("comments")) {

        const levels = 6;
        let popular = Array.from(document.body.getElementsByClassName("_1qeIAgB0cPwnLhDF9XSiJM"));
        for (var idx=0; idx < popular.length;idx++) console.log(popular[idx].textContent);

        const filter_results = popular.filter(entry => unwanted.some(unwanted_word => entry.textContent.startsWith(unwanted_word)));
        console.log(filter_results);


        for (i = 0; i < filter_results.length; i++) {
            let item = filter_results[i];
            for (var j = 0; j < levels; j++) {
                if (item.parentElement) {
                    item = item.parentElement;
                } else {
                    break;
                }
            }
            if (item) {
                console.log("deleting " + item.textContent);
                item.parentElement.removeChild(item);
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
