console.log("extension loaded!");

function stopOrGoBack(tabs) {
	var currentTab = tabs[0];
	//console.log(currentTab.status);
	if (currentTab.status === "loading") {
		browser.tabs.executeScript(currentTab.tabId, {
			code: "window.stop();",
			allFrames: true,
			runAt: "document_start"
		});
	}
	else {
		browser.tabs.goBack();
	}
}

function onError(error) {
	console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(function() {
	var getting = browser.tabs.query({active: true, currentWindow: true});
	getting.then(stopOrGoBack, onError);
});

