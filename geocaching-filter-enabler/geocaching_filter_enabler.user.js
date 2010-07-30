// Geocaching Filter Enabler 0.1
// Copyright (c) 2010, Lloyd Pick
//
// This is a Greasemonkey user script.
//
// ==UserScript==
// @name           Geocaching Filter Enabler
// @namespace      http://limi.co.uk/
// @description    Enables the cache filters for maps
// @include        http://www.geocaching.com/map/*
// ==/UserScript==

unsafeWindow.nonPM = function(){}
unsafeWindow.pm = true;

function enableFilter() {
  var chkboxes=document.getElementsByTagName('input');
  for (var i=0; i < chkboxes.length; i++) {
    if (chkboxes[i].type=="checkbox") {
      if (chkboxes[i].disabled==true) {
        chkboxes[i].disabled=false
      }
    }
  }
}

window.setTimeout(enableFilter, 1);

