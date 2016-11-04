function getPageUrl(url, callback, errorCallback) {
  console.log("getPageUrl",url);
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.responseType = 'document';
  x.onload = function() {
    // Parse and process the response.
    var response = x.response;
    callback(response);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
	console.log(statusText);
	//  document.getElementById('status').textContent = statusText;
}

function parseLogPage(doc) {
	var items = doc.getElementsByClassName('feed_item_activity');
	var re = /Question added by/;
	var res = null;
	for(var i=0; i< items.length;++i ) {
		console.log(items[i].innerText);
		if(re.test(items[i].innerText))
			res = items[i];
	}
	console.log(res);
	if(res) {
		var title = document.getElementsByClassName("question_qtext")[0];
		title.appendChild(res);
	}
}

    renderStatus(document.URL);
    console.log('loaded');
    getPageUrl(document.URL+'/log', 
    	function(doc) {
    		parseLogPage(doc);

    	},
    	function(errorMessage) {
    		renderStatus('Cannot get page. ' + errorMessage);
    	});
