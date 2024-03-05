/*
	1. Waits for message from toolbar button script (noclicknext.js).
	2. Uses URL from message to query the server.
	3. Redirects to new URL upon return message from server.
*/

browser.runtime.onMessage.addListener(message => {	
	messageURL = 'http://alek.us:42069/noclicknext/ScrapeAllPages' + '?url=' + message.data.replace(/\/$/, ""); //CANNOT HAVE A SLASH AT THE END!!!
	console.log("query URL: " + messageURL);

	$.ajax({
		url: messageURL,
		type: 'GET',
		success: function(data){
			console.log("RESPONSE: " + data);
			newURL = data.replace('alek.us/', 'alek.us:42069/');   //use port 42069 for the url
			//newURL = newURL.replace('NoClickNext', 'noclicknext'); //remove this after fix is applied to serverside url builder
			console.log("NEW URL: " + newURL);
			$("p").html("Redirecting to: " + newURL); //show the response from the server
			window.location.href = newURL; //open the results url
		},
		error: function(xhr, status){
			$("p").html(status + ' ' + xhr.status); //show the response from the server
		}
	});
	
	return Promise.resolve({response: "Finished."});
});