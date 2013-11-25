// ==UserScript==
// @name         MPUK Forums 2013
// @description  Style changes
// @include      http://forums.multiplay.com/*
// @version      0.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { background: none !important; }');
addGlobalStyle('header { display: none !important; }');
addGlobalStyle('.above_body { display: none !important; }');
addGlobalStyle('#terms { display: none !important; }');
addGlobalStyle('#sidebar_container { display: none !important; }');
addGlobalStyle('#content { margin-right: 0 !important; }')