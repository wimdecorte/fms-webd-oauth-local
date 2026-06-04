var caller = window.opener;

function postOAuthResultToCaller(identifier, autherr, requestId) {
	if (!caller) {
		return;
	}
	caller.postMessage(
		{ identifier: identifier, errorMessage: autherr, requestId: requestId },
		'*'
	);
}

function showOAuthLogin(providerName) {
	runOAuthLogin(providerName, postOAuthResultToCaller);
}

window.addEventListener('message', function (e) {
	var data = e.data;
	var action = data && data.action;
	var providerName = data && data.providerName;
	if (action === 'identifier') {
		showOAuthLogin(providerName);
	}
});

window.addEventListener('load', function () {
	if (resumeOAuthAfterRedirect(postOAuthResultToCaller)) {
		return;
	}
	if (caller) {
		caller.postMessage('hello', '*');
	}
});
