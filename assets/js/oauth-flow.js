var OAUTH_DEMO_TRACKING_ID = '123432';
var OAUTH_STORAGE_KEY = 'oauth-response';
var OAUTH_SESSION_PENDING = 'oauth-pending';
var OAUTH_SESSION_TRACKING = 'oauth-tracking-id';
var OAUTH_SESSION_REQUEST = 'oauth-request-id';

function getOAuthResponseParameter(input, parameter) {
	if (input != null) {
		var params, pair, i;

		params = input.split('&');
		for (i = 0; i < params.length; i++) {
			pair = params[i].split('=');
			if (pair != null && pair.length == 2) {
				if (pair[0] == parameter) {
					return pair[1];
				}
			}
		}
	}
	return '';
}

function useFullPageRedirect() {
	return typeof OAUTH_CONFIG !== 'undefined' && OAUTH_CONFIG.useFullPageRedirect;
}

function clearOAuthSessionState() {
	sessionStorage.removeItem(OAUTH_SESSION_PENDING);
	sessionStorage.removeItem(OAUTH_SESSION_TRACKING);
	sessionStorage.removeItem(OAUTH_SESSION_REQUEST);
}

function getOAuthResponseFromLocation() {
	var search, params;

	if (!useFullPageRedirect()) {
		return null;
	}

	search = window.location.search;
	if (!search || search.length < 2) {
		return null;
	}

	params = search.substring(1);
	if (getOAuthResponseParameter(params, 'trackingID') && getOAuthResponseParameter(params, 'identifier')) {
		return params;
	}

	return null;
}

function stripOAuthParamsFromUrl() {
	if (!window.history || !window.history.replaceState) {
		return;
	}
	window.history.replaceState(null, '', window.location.pathname + window.location.hash);
}

function saveOAuthSessionState(trackingId, requestId) {
	sessionStorage.setItem(OAUTH_SESSION_PENDING, '1');
	sessionStorage.setItem(OAUTH_SESSION_TRACKING, trackingId);
	sessionStorage.setItem(OAUTH_SESSION_REQUEST, requestId);
}

function tryCompleteOAuthResponse(response, trackingId, requestId, onComplete) {
	if (!response || !onComplete) {
		return false;
	}

	var retTrackingId = getOAuthResponseParameter(response, 'trackingID');
	if (trackingId !== retTrackingId) {
		return false;
	}

	localStorage.removeItem(OAUTH_STORAGE_KEY);
	clearOAuthSessionState();
	onComplete(
		getOAuthResponseParameter(response, 'identifier'),
		getOAuthResponseParameter(response, 'error'),
		requestId
	);
	return true;
}

function resumeOAuthAfterRedirect(onComplete) {
	var trackingId, requestId, response;

	if (!useFullPageRedirect() || !onComplete) {
		return false;
	}

	response = localStorage.getItem(OAUTH_STORAGE_KEY) || getOAuthResponseFromLocation();
	if (!response) {
		return false;
	}

	requestId = sessionStorage.getItem(OAUTH_SESSION_REQUEST);
	if (!requestId) {
		return false;
	}

	trackingId = sessionStorage.getItem(OAUTH_SESSION_TRACKING);
	if (!trackingId) {
		trackingId = getOAuthResponseParameter(response, 'trackingID');
	}

	if (tryCompleteOAuthResponse(response, trackingId, requestId, onComplete)) {
		stripOAuthParamsFromUrl();
		return true;
	}

	return false;
}

function listenForOAuthPopupResponse(trackingId, requestId, onComplete) {
	function processOAuthResponse(event) {
		if (event.key && event.key !== OAUTH_STORAGE_KEY) {
			return;
		}
		tryCompleteOAuthResponse(event.newValue, trackingId, requestId, onComplete);
	}

	window.addEventListener('storage', processOAuthResponse);
}

function runOAuthLogin(providerName, onComplete) {
	var trackingId = OAUTH_DEMO_TRACKING_ID;
	var master = window.location.hostname;
	var child = null;

	getOAuthURL(trackingId, master, providerName, function (oauthUrl, requestId) {
		if (!oauthUrl) {
			alert('Could not start OAuth login. Check FileMaker Server OAuth configuration and try again.');
			if (child && !child.closed) {
				child.close();
			}
			return;
		}

		if (useFullPageRedirect()) {
			saveOAuthSessionState(trackingId, requestId);
			window.location.replace(oauthUrl);
			return;
		}

		child = window.open('', 'OAuth', 'width=800, height=600');
		child.location.replace(oauthUrl);
		listenForOAuthPopupResponse(trackingId, requestId, onComplete);
	});
}

function getIdentityProviderName() {
	if (typeof OAUTH_CONFIG !== 'undefined' && OAUTH_CONFIG.identityProvider) {
		return OAUTH_CONFIG.identityProvider;
	}
	return 'Keycloak';
}

function shouldAutoStartOAuth() {
	return typeof OAUTH_CONFIG !== 'undefined' && OAUTH_CONFIG.autoStartOAuth;
}
