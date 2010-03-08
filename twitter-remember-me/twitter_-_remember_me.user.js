// ==UserScript==
// @name         Twitter - Remember Me
// @description  Auto tick the checkbox for remember me because I keep forgetting
// @include      http://twitter.com/
// @version	 0.1
// ==/UserScript==

var remember_me = document.getElementById('remember');
if (remember_me) {
	remember_me.checked = 'checked';
}
