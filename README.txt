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

  autoStartOAuth (index.html only)
    When true, OAuth starts automatically after the server returns provider info.
    The Member Login button is still shown so users can retry manually.

  useFullPageRedirect
    When false (default), the IdP opens in a popup and the parent page listens for a
    storage event from oauth-landing.html (popup flow).

    When true, the current page redirects to the IdP. X-FMS-Return-URL is set to this
    page's URL so the user can land here again after authentication. On load, the page
    reads localStorage (oauth-response) and sessionStorage (pending tracking/request IDs)
    to finish the flow—no popup and no cross-window storage event.

    Full-page mode requires the OAuth callback to leave oauth-response in localStorage
    before the user returns to this page. If your server only writes that key on
    oauth-landing.html, customize that page to redirect back to your demo URL, or confirm
    that FileMaker Server accepts your page as the return URL.

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
