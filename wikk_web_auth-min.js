var wikk_web_auth = (function () {
var VERSION = "1.0.1";
var auth_cgi = "/ruby/login.rbx";
var use_lock_only = false; 
var return_url = ''; 
var lock_image = new Image(); 
var unlock_image = new Image(); 
var authentication_state = false; 
var login_span = ''; 
var callers_callback = null; 
var recheck_interval = 180000; 
function version() { return VERSION; }
function web_auth_AJAXCallback(data)
{
var login_span_ref =  document.getElementById(login_span);
if(data.returnCode == 'true') {
authentication_state = true;
lock_text = use_lock_only ? '' : 'Logout ';
url = '<a href="' + auth_cgi + '?action=logout&ReturnURL=' + return_url + '">' + lock_text + '<img src="' + unlock_image.src + '"></a>';
} else {
authentication_state = false;
lock_text = use_lock_only ? '' : 'Login ';
url = '<a href="' + auth_cgi + '?ReturnURL=' + return_url + '">' + lock_text + '<img src="' + lock_image.src + '"></a>';
}
if(login_span_ref != null) {
login_span_ref.innerHTML = url;
}
if(callers_callback != null) {
var callback = callers_callback;
clear_callers_callback();
callback(authentication_state);
}
wikk_ajax.delayed_ajax_post_call(auth_cgi , {action: 'test'}, web_auth_AJAXCallback, null, null, 'json', false, recheck_interval);
}
function logged_in(use_lock_only, the_return_url, the_login_span, the_callers_callback) {
lock_image.src="/images/locked.gif";
unlock_image.src = "/images/unlocked.gif";
if(use_lock_only != null) { lock_only = use_lock_only; }
if(the_return_url != null) { return_url = the_return_url; }
if(the_login_span != null) { login_span = the_login_span; }
set_callers_callback(the_callers_callback);
wikk_ajax.ajax_post_call(auth_cgi , {action: 'test'}, web_auth_AJAXCallback, null, null, 'json', false);
}
function authenticated() {
return authentication_state;
}
function set_callers_callback(the_callers_callback) {
callers_callback = the_callers_callback;
}
function clear_callers_callback() {
callers_callback = null;
}
function set_recheck_interval(milliseconds) {
recheck_interval = (milliseconds == null) ? 180000 : milliseconds; 
}
return {
logged_in: logged_in,
authenticated: authenticated,
set_callers_callback: set_callers_callback,
clear_callers_callback: clear_callers_callback,
set_recheck_interval: set_recheck_interval,
version: version
}
})();
