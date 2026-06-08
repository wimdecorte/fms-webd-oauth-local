/**
 * Copy to oauth-config.js and adjust flags for your deployment.
 * This site is static HTML/JS on FileMaker Server — the browser cannot read a .env file.
 */
var OAUTH_CONFIG = {
	/** Published WebDirect file name to open after OAuth (no .fmp12 extension). */
	dbName: 'OAuth_tester',
	/** index.html: start OAuth as soon as provider info loads (button remains for manual retry). */
	autoStartOAuth: false,
	/** Use full-page redirect to the IdP instead of a popup (see README). */
	useFullPageRedirect: false,
	/** Provider name passed to getOAuthURL (must match your FileMaker Server OAuth config). */
	identityProvider: 'Keycloak'
};
