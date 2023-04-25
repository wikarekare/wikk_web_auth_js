all: www/wikarekare/js/wikk_web_auth-min.js

www/wikarekare/js/wikk_web_auth-min.js: www/wikarekare/js/wikk_web_auth.js
	(cd www/wikarekare/js; minimise.rb wikk_web_auth.js)
