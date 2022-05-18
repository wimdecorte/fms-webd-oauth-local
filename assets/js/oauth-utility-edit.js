function getProviderInfo(callback) {
	var xhr = new XMLHttpRequest();
	//var server = 'https://mbp2013.ets.fm';
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var providerInfo = null;
			if (xhr.status == 200 && xhr.responseText != null && xhr.responseText != '') {
				providerInfo = xhr.responseText;
				// alert(providerInfo);
			}
			if (callback) {
				callback(providerInfo);
			}
		}
	};
	//xhr.open('GET', server + '/fmi/webd/oauthapi/oauthproviderinfo', true);
	xhr.open('GET', '/fmi/webd/oauthapi/oauthproviderinfo', true);
	//xhr.setRequestHeader('X-FMS-Application-Type', '8');
	//xhr.setRequestHeader('X-FMS-Application-Version', '17');
	xhr.send();
}

function getOAuthURL(trackingId, masterAddr, provider, callback) {
	var xhr, queryStr;
	//var server = 'https://mbp2013.ets.fm';
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (callback) {
				callback(xhr.responseText, xhr.getResponseHeader('X-FMS-Request-ID'));
			}
		}
	};
	queryStr = 'trackingID=' + trackingId + '&provider=' + provider + '&address=' + masterAddr + '&X-FMS-OAuth-AuthType=2';
	// xhr.open('GET', server + '/fmi/webd/oauthapi/getoauthurl?' + queryStr, true);
	xhr.open('GET', '/fmi/webd/oauthapi/getoauthurl?' + queryStr, true);
	xhr.setRequestHeader('X-FMS-Application-Type', '8');
	// xhr.setRequestHeader('X-FMS-Application-Version', '17');
	// xhr.setRequestHeader('X-FMS-Return-URL', window.location.origin + '/fmi/webd/oauth-landing.html');
	xhr.setRequestHeader('X-FMS-Return-URL', "https://" + masterAddr + '/fmi/webd/oauth-landing.html');
	xhr.send();
}

function doOAuthLogin(dbName, requestId, identifier, homeurl, autherr) {
	var form, node, queryStr;
	var server = 'https://mbp2013.ets.fm';
	
	form = document.createElement('form');
	form.style.display = 'none';
	// form.action = server + '/fmi/webd/' + encodeURIComponent(dbName);
	form.action = '/fmi/webd/' + encodeURIComponent(dbName);
	form.method = 'POST';
	form.target = '_self';

	node = document.createElement('input');
	node.type = 'text';
	node.name = 'user';
	node.value = requestId;
	form.appendChild(node.cloneNode());
	
	node = document.createElement('input');
	node.type = 'text';
	node.name = 'pwd';
	node.value = identifier;
	form.appendChild(node.cloneNode());
	
	queryStr = 'lgcnt=1&oauth=1';
	if (homeurl != '') {
		queryStr += ('&homeurl=' + homeurl);
	}
	if (autherr != '') {
		queryStr += ('&autherr=' + autherr);
	}
	
	if (queryStr != '') {
		form.action += ('?' + queryStr);
	}
	
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}
