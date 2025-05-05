chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getEmail") {
      chrome.storage.local.get(["userEmail"], (result) => {
        sendResponse({ email: result.userEmail });
      });
      return true;
    }

    if (request.type === "setEmail" && request.email) {
      chrome.storage.local.set({ userEmail: request.email }, () => {
        sendResponse({ success: true });
      });
      return true;
    }

    if (request.type === "clearEmail") {
        chrome.storage.local.remove("userEmail", () => {
          sendResponse({ success: true });
        });
        return true;
    }

    if (request.type === "closeThisTab") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.remove(tabs[0].id);
        }
      });
    }

  });
