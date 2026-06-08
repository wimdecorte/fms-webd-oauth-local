function completeIndexOAuth(identifier, autherr, requestId) {
	doOAuthLogin(
		OAUTH_CONFIG.dbName,
		requestId,
		identifier,
		'https://' + window.location.hostname,
		autherr
	);
}

function showOAuthLogin(providerName) {
	runOAuthLogin(providerName, completeIndexOAuth);
}

function initOAuth() {
	if (resumeOAuthAfterRedirect(completeIndexOAuth)) {
		return;
	}

	getProviderInfo(function (providerInfo) {
		if (providerInfo != null && providerInfo != '') {
			var button = document.createElement('button');
			var oauthWrapper = document.getElementById('inner');
			var providerName = getIdentityProviderName();

			button.innerHTML = 'Member Login';
			button.style.width = '350px';
			button.style.height = '60px';
			button.style.textAlign = 'center';
			button.dataset.provider = providerInfo;
			button.onclick = function () {
				showOAuthLogin(providerName);
			};

			oauthWrapper.appendChild(button);

			if (shouldAutoStartOAuth()) {
				showOAuthLogin(providerName);
			}
		}
	});
}
