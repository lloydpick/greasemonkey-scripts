// ==UserScript==
// @name         MPUK Forums 2013
// @description  Style changes
// @include      http://forums.multiplay.com/*
// @version      0.2
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
addGlobalStyle('.news-block { display: none !important; }');
addGlobalStyle('.cta { display: none !important; }');
addGlobalStyle('.above_body { margin-top: 10px !important; }');
addGlobalStyle('.above_body #content-header { height: auto !important; }');
addGlobalStyle('.above_body #content-header iframe { display: none !important; }');
addGlobalStyle('.doc_header { min-height: 12px !important }');
addGlobalStyle('#terms { display: none !important; }');
addGlobalStyle('#sidebar_container { display: none !important; }');
addGlobalStyle('#content { margin-right: 0 !important; }');