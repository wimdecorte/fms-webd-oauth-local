This sample website shows how you can start the OAuth login flow into a WebDirect file, right from your own web site.
Without taking the user to the WebDirect launch center or the WebDirect file's login screen.

This version is when the website itself runs through FileMaker Server's web server.  all references in the code are local to the FileMaker Server machine.
If you have a web site that runs on another server, see this repo: https://github.com/wimdecorte/fms-webd-oauth-remote

See this blog post for how it works:
https://www.soliantconsulting.com/blog/filemaker-custom-oauth-login-webdirect/

This functionality already exists for logging in with regular FileMaker accounts, see this resource:
https://github.com/bharlow/fm-webdirect-custom

Security note (identifier.html)
-------------------------------
identifier.html uses window.postMessage with targetOrigin "*" so any opener can receive
the OAuth identifier and request ID. That is intentional for this demo and for the
companion remote-site sample (no hardcoded marketing-site URL).

For production, replace "*" with your parent page's exact origin (e.g.
https://www.example.com) on both postMessage calls in identifier.html, and on the
parent page validate event.origin before using event.data. index.html does not use
postMessage; it completes login on the same host via doOAuthLogin.

Enjoy!

Wim Decorte
Soliant Consulting Inc.


--- website provided by Photon by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


A simple (gradient-heavy) single pager that revisits a style I messed with on two
previous designs (Tessellate and Telephasic). Fully responsive, built on Sass,
and, as usual, loaded with an assortment of pre-styled elements. Have fun! :)

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = Not included)

Feedback, bug reports, and comments are not only welcome, but strongly encouraged :)

AJ
aj@lkn.io | @ajlkn


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Responsive Tools (github.com/ajlkn/responsive-tools)
