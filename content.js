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
	console.log(items);
	for (var i = 0; i < items.length; ++i) {
		console.log(items[i].innerText);
		if (re.test(items[i].innerText)) {
			res = items[i];
			break;
		}
	}

	if (res) {
		// Get the date the question was added
		var details = res.parentElement.parentElement.children[1]
				.cloneNode(true);
		var txt = details.childNodes[details.childNodes.length - 1].wholeText;
		var spn = document.createTextNode(" " + txt);
		res.appendChild(spn);
		console.log(res);
		// Add styles, light grey small font size, username underlined
		res.style = 'color : rgb(153, 153, 153); font-size : 13px;';
		var userele = res.getElementsByClassName('user')[0];
		if (userele)
			userele.style = 'color : rgb(153, 153, 153); text-decoration : underline;';

		var title = document.getElementsByClassName("question_qtext")[0];
		title.appendChild(res);
	} else {
		console.log('Original author not found. Items found');
		var items = doc.getElementsByClassName('AddQuestionOperationView');
		console.log(items);

		var title = document.getElementsByClassName("question_qtext")[0];
		var div = document.createElement('div');
		div.style = 'color : rgb(153, 153, 153); font-size : 13px;';
		div.appendChild(document
				.createTextNode('Cannot find original author see the '));
		var link = document.createElement("a");
		link.href = url; // Insted of calling setAttribute 
		link.innerHTML = "log page."; // <a>INNER_TEXT</a>

		div.appendChild(link);
		if(title)
			title.appendChild(div);
		else
			logStatus("title not found - not a question page");
	}
}

// URL for log file with the required details
var url = window.location.origin + window.location.pathname + '/log';

logStatus(url);
var loc = window.location.pathname;
if( (loc.length > 1) 
		&& !loc.endsWith('/log')
		&& !loc.match('/answer/')) {
	getPageUrl(url, function(doc) {
		parseLogPage(doc);
	}, function(errorMessage) {
		logStatus('Cannot get page. ' + errorMessage);
	});
} else {
	logStatus("Does not look like a question page pathname is "+loc);
}