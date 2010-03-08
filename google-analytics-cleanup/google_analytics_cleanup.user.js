// ==UserScript==
// @name         Google Analytics Cleanup
// @description  Fixes some annoyances in Google Analytics
// @include      https://www.google.com/analytics/*
// @version	 0.1
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

addGlobalStyle('td.property_row { display:none !important; }');
addGlobalStyle('ul.admin_lefthandside { display:none !important; }');
addGlobalStyle('div#content > table { width:100% !important; }');





