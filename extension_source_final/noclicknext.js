/*
	When toolbar button is pressed:
	1. Open new tab to redirect page.
	2. Send message to redirect page tab with url.
*/

function onError(error) { console.error(`Error: ${error}`); }

function noclicknext(){
	var msg = {
		data: currentTab.url,
		type: "noclicknextURLMessage"
	};
	
	var newTab = browser.tabs.create({ url:"test.com:40000/redirect.html" });
	
	setTimeout(function(){ //Timeout so redirect
		browser.tabs.sendMessage(
			currentTab.id, //id of the new tab that was created
			msg
		).then(response => {
			//console.log("Message from the content script:");
			//console.log(response.response);
		}).catch(onError);
	}, 2000);
}

// listen for toolbar button press:
browser.browserAction.onClicked.addListener(noclicknext);
