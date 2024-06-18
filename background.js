chrome.contextMenus.create({
    id: "decodeBase64Menu",
    title: "Decode Base64",
    contexts: ["selection"]
});

function decodeBase64OnClick(info, tab) {
    chrome.tabs.sendMessage(tab.id, {
        action: "decodeBase64",
        selectionText: info.selectionText
    });
}

chrome.contextMenus.onClicked.addListener(decodeBase64OnClick);

function showNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Base64 Decoder",
        message: message
    });
}
