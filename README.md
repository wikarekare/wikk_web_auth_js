# wikk_web_auth

* Source https://github.com/wikarekare/wikk_web_auth_js

## DESCRIPTION:

Javascript module provides common authentication framework for Wikarekare's html5 pages. 

## FEATURES/PROBLEMS:

## SYNOPSIS:

* A separate login button is inserted into a div or span on the HTML page, which triggers the wikk_auth_js library
```
  <html>
  <head>
    <script src="wikk_web_auth.js"></script>
    ...
    <script>
      init() {
        //Check if we are authenticated, and fill in login span appropriately. 
        logged_in(true, '/admin/sites.html'); //(display lock/unlock image, return url after login page)
        ...
      }
      ...
    </script>
  </head>
  <body onload="init();">
    ...
    <span id="login_span"></span>
    ...
```
* The cgi simple calls the class level WIKK::Web_Auth.authenticate? call, for a true/false response.
```
  require 'wikk_web_auth'
  @authenticated = Authenticated.authenticated?(@cgi)
```

## REQUIREMENTS:

* Uses wikk_ajax_js in conjunction with Ruby cgi login.rbx (wikk_web_auth_login)

## INSTALL:

* cp to webserver's js directory (i.e. where ever it can be served by the web server)

## LICENSE:

(The MIT License)

Derived from Wikarekare local.js library.

Copyright (c) 2004-2016

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
