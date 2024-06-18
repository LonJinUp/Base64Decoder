chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "decodeBase64") {
        var decodedText = atob(request.selectionText);
        var tempTextarea = document.createElement("textarea");
        tempTextarea.value = decodedText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        try {
            var successful = document.execCommand('copy');
            if (successful) {
                chrome.runtime.sendMessage({ action: "showNotification", message: "Text copied to clipboard!" });
            } else {
                throw new Error('Unable to copy text');
            }
        } catch (error) {
            console.error('Unable to copy text: ', error);
        } finally {
            document.body.removeChild(tempTextarea);
        }
    }
});
