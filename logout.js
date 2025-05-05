function waitForLogoutButton() {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Log out') {
        console.log('Found Log out button');
        btn.addEventListener('click', function () {
          chrome.runtime.sendMessage({ type: "clearEmail" }, function () {
            console.log("Email cleared from storage on logout");
          });
        }, { once: true });
        return;
      }
    }
    setTimeout(waitForLogoutButton, 300);
  }

  waitForLogoutButton();