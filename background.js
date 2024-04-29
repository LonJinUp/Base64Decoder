
chrome.contextMenus.create({
    id: "decodeBase64Menu",
    title: "Decode Base64",
    contexts: ["selection"]
});

function decodeBase64OnClick(info, tab) {
    var decodedText = atob(info.selectionText);
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = decodedText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            showNotification('Text copied to clipboard!');
        } else {
            throw new Error('Unable to copy text');
        }
    } catch (error) {
        console.error('Unable to copy text: ', error);
    } finally {
        document.body.removeChild(tempTextarea);
    }
}

chrome.contextMenus.onClicked.addListener(decodeBase64OnClick);

function showNotification(message) {
    if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notification.");
        return;
    }

    Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            var notification = new Notification("Base64 Decoder", {
                body: message,
                icon: "icon.png"
            });
            setTimeout(notification.close.bind(notification), 3000);
        }
    });
}
