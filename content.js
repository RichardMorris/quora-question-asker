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
		var bar = res.parentElement.parentElement.children[1].cloneNode(true);
     		var txt = bar.childNodes[bar.childNodes.length-1].wholeText;
        	var spn = document.createTextNode(" " + txt);
        	res.appendChild(spn);

    res.style = 'color : rgb(153, 153, 153); font-size : 13px;';
    res.getElementsByClassName('user')[0].style = 'color : rgb(153, 153, 153); text-decoration : underline;';

		var title = document.getElementsByClassName("question_qtext")[0];
		title.appendChild(res);
	}
}

var url = window.location.origin + window.location.pathname + '/log';

renderStatus(url);

getPageUrl(url, 
    	function(doc) {
    		parseLogPage(doc);

    	},
    	function(errorMessage) {
    		renderStatus('Cannot get page. ' + errorMessage);
    	});
