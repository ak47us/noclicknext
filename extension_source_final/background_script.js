/*
	1. Sets currentTab variable when a tab is selected.
	2. Checks if current tab is in whitelist.
*/


var currentTab;

function checkWhitelist(){
	for(var i = 0; i < whitelist.length; i++){
		if (currentTab.url.indexOf(whitelist[i]) != -1){
			return true;
		}
	}
	return false;
}

function getActiveTab(tabs) {
	// Get the active tab:
	browser.tabs.query({currentWindow: true, active: true}).then(
		function(tabs){
			// SUCCESS:
			currentTab = tabs[0];
			//console.log("Current URL: " + currentTab.url);
			if (checkWhitelist() == true){
				browser.browserAction.setIcon({path: "icons/ready.gif"});
				browser.browserAction.enable(); // ENABLED
			}else{
				browser.browserAction.setIcon({path: "icons/icon-38-grey.png"});
				browser.browserAction.disable(); // DISABLED
			}
		},
		function(){
			// FAILURE:
			console.log(`Error: ${error}`);
		}
	);
}

// listen to tab URL changes:
browser.tabs.onUpdated.addListener(getActiveTab);
// listen to tab switching:
browser.tabs.onActivated.addListener(getActiveTab);
// update when the extension loads initially:
getActiveTab();