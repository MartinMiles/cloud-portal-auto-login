function encodeEmail(email) {
  const b64 = btoa(email);
  return b64.split('')
            .map(c => String.fromCharCode(c.charCodeAt(0) + 3))
            .join('');
}

function decodeEmail(encoded) {
  const b64 = encoded.split('')
                     .map(c => String.fromCharCode(c.charCodeAt(0) - 3))
                     .join('');
  return atob(b64);
}

function waitForInputAndButton(savedEmail) {
  const input = document.querySelector('input#username');
  const button = document.querySelector('button[name="action"]');

  if (!input || !button) {
    setTimeout(() => waitForInputAndButton(savedEmail), 200);
    return;
  }

  if (savedEmail) {
    input.value = savedEmail;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    setTimeout(() => button.click(), 300);
  } else {
    button.addEventListener('click', function () {
      const enteredEmail = input.value.trim();
      if (enteredEmail) {
        const encoded = encodeEmail(enteredEmail);
        chrome.runtime.sendMessage({ type: "setEmail", email: encoded }, function () {
          console.log("Stored obfuscated email.");
        });
      }
    }, { once: true });
  }
}

chrome.runtime.sendMessage({ type: "getEmail" }, function (response) {
  const encoded = response && response.email;
  const savedEmail = encoded ? decodeEmail(encoded) : null;
  waitForInputAndButton(savedEmail);
});
