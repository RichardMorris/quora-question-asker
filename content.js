// Request URL with callback functions
function getPageUrl(url, callback, errorCallback) {
	var x = new XMLHttpRequest();
	x.open('GET', url);
	x.responseType = 'document';
	x.onload = function() {
		// Parse and process the response.
		callback(x.response);
	};
	x.onerror = function() {
		errorCallback('Network error.');
	};
	x.send();
}

// Display a log message
function logStatus(statusText) {
	console.log(statusText);
	// document.getElementById('status').textContent = statusText;
}

// Parse the Quora Question log page
function parseLogPage(doc) {
	// Find the element with name of who asked the question
	var re = /Question added by/;
	var items = doc.getElementsByClassName('feed_item_activity');
	var res = null;
	for (var i = 0; i < items.length; ++i) {
		if (re.test(items[i].innerText)) {
			res = items[i];
			break;
		}
	}

	if (res) {
		// Get the date the question was added
		var details = res.parentElement.parentElement.children[1].cloneNode(true);
		var txt = details.childNodes[details.childNodes.length - 1].wholeText;
		var spn = document.createTextNode(" " + txt);
		res.appendChild(spn);

		// Add styles, light grey small font size, username underlined
		res.style = 'color : rgb(153, 153, 153); font-size : 13px;';
		var userele = res.getElementsByClassName('user')[0];
		if(userele)
			userele.style = 'color : rgb(153, 153, 153); text-decoration : underline;';

		var title = document.getElementsByClassName("question_qtext")[0];
		title.appendChild(res);
	}
}

// URL for log file with the required details
var url = window.location.origin + window.location.pathname + '/log';

logStatus(url);

// 
getPageUrl(url, function(doc) {
	parseLogPage(doc);
	}, function(errorMessage) {
		logStatus('Cannot get page. ' + errorMessage);
	});
