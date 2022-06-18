var wikk_web_auth = (function () {
  //authentication
  var VERSION = "1.0.1";
  var auth_cgi = "/ruby/login.rbx";
  var use_lock_only = false; //Use only the lock/unlock images, and no text in the div.
  var return_url = ''; //Where we jump to if we are authenticated.
  var lock_image = new Image(); //cache the lock image here
  var unlock_image = new Image(); //cache the unlock image here
  var authentication_state = false; //We have authenticated this session.
  var login_span = ''; //id of the div or span element we inject the login button into.
  var callers_callback = null; //Call this function after we get a response from the server.
  var recheck_interval = 180000; //Recheck we are logged in every interval, and change div/span appropriately.

  function version() { return VERSION; }

  //Asynchronous callback from check of authenticated state/or a login/logout.
  //A change in login state will toggle the lock/unlock image in the span.
  //Uses login.rbx (wikk_web_auth_login)
  //  @param data [Hash] Created from the returned json by ajax call.
  //  @note Fills in the login_span, and triggers a recheck after the recheck_interval. 
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
    //recheck the login state after the recheck_interval. A change in login state will toggle the lock/unlock image in the span.
    wikk_ajax.delayed_ajax_post_call(auth_cgi , {action: 'test'}, web_auth_AJAXCallback, null, null, 'json', false, recheck_interval);
  }
  
  //Set key module variable and then initiates an Ajax call to login.rbx (wikk_web_auth_login)
  //This will populate the login span (or div) with a lock/unlock image button to call login.rbx
  //  @param use_lock_only [Boolean] if true, the span will have just the image, and no text
  //  @param the_return_url [String] we redirect here, if the user logs in successfully. Set to the calling page.
  //  @param the_login_span [String] the span or div we put the login/logout button into
  //  @param the_callers_callback [Function] We will call this, if not null, after the first Ajax callback
  function logged_in(use_lock_only, the_return_url, the_login_span, the_callers_callback) {
    lock_image.src="/images/locked.gif";
    unlock_image.src = "/images/unlocked.gif";
    
    if(use_lock_only != null) { lock_only = use_lock_only; }
    if(the_return_url != null) { return_url = the_return_url; }
    if(the_login_span != null) { login_span = the_login_span; }
    set_callers_callback(the_callers_callback);
    
    //cookie is _wikk_rb_sess_id , validated by ruby/login.rbx
    wikk_ajax.ajax_post_call(auth_cgi , {action: 'test'}, web_auth_AJAXCallback, null, null, 'json', false);
  }

  //Are we authenticated?
  //  @return [Boolean]
  function authenticated() {
    return authentication_state;
  }
  
  //Set a user level callback. Note, this will fire only once. To repeat, call within the callback.
  //  @param the_callers_callback [Function] We will call this, if not null, after the next Ajax callback
  function set_callers_callback(the_callers_callback) {
    callers_callback = the_callers_callback;
  }
  
  //Stops further user level callbacks.
  function clear_callers_callback() {
    callers_callback = null;
  }

  //Change the current recheck interval. A change in login state will toggle the lock/unlock image in the span.
  //  @param milliseconds [Integer] Delay between Ajax calls to check the current login state.
  function set_recheck_interval(milliseconds) {
    recheck_interval = (milliseconds == null) ? 180000 : milliseconds; //Default value is 3 minutes.
  }

  //return a hash of key: function pairs, with the key being the same name as the function.
  //Hence call with wikk_auth_module.function_name()
  return { 
    logged_in: logged_in,
    authenticated: authenticated,
    set_callers_callback: set_callers_callback,
    clear_callers_callback: clear_callers_callback,
    set_recheck_interval: set_recheck_interval,
    version: version
  }
})();



