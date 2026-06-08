This sample website shows how you can start the OAuth login flow into a WebDirect file, right from your own web site.
Without taking the user to the WebDirect launch center or the WebDirect file's login screen.

This version is when the website itself runs through FileMaker Server's web server.  all references in the code are local to the FileMaker Server machine.
If you have a web site that runs on another server, see this repo: https://github.com/wimdecorte/fms-webd-oauth-remote

See this blog post for how it works:
https://www.soliantconsulting.com/blog/filemaker-custom-oauth-login-webdirect/

This functionality already exists for logging in with regular FileMaker accounts, see this resource:
https://github.com/bharlow/fm-webdirect-custom

Feature flags (oauth-config.js)
-------------------------------
This demo is static HTML and JavaScript served by FileMaker Server. A .env file is not
used: nothing in the browser reads it unless you add a separate build step to inject
values at deploy time. Instead, edit assets/js/oauth-config.js (see
assets/js/oauth-config.example.js).

  dbName (index.html only)
    Published WebDirect file name to open after OAuth (no .fmp12 extension).

  autoStartOAuth (index.html only)
    When true, OAuth starts automatically after the server returns provider info.
    The Member Login button is still shown so users can retry manually.

  useFullPageRedirect
    Same OAuth as the popup flow: getOAuthURL on FileMaker Server, user signs in at the
    identity provider, FileMaker Server completes the handshake. The IdP never calls your
    demo HTML; only FileMaker Server does, via the URL sent in X-FMS-Return-URL on
    getOAuthURL (see assets/js/oauth-utility-edit.js).

    false (default): This page stays open. A popup goes to the IdP. X-FMS-Return-URL is
    /fmi/webd/oauth-landing.html (Claris default). That page runs in the popup, writes
    oauth-response to localStorage, and this page hears the storage event in the other
    window.

    true: This tab goes to the IdP (no popup). X-FMS-Return-URL is this page's URL instead
    of oauth-landing.html so FileMaker Server sends the user back here when finished—the
    same header, different value. On load, resumeOAuthAfterRedirect reads the result from
    the query string (trackingID, identifier, error, etc.) and the request ID from
    sessionStorage (saved before redirect). That replaces the popup's storage listener:
    popup mode uses oauth-landing.html in another window to write localStorage; full-page
    mode returns the same fields on this page's URL.

  identityProvider
    Provider name sent to getOAuthURL (default Keycloak for this sample).

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
