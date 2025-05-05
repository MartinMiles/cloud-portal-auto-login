function clickConfirmButton() {
  const button = document.querySelector('button[name="action"]');
  if (button) {
    button.click();
    console.log("✅ Confirm button clicked");
  } else {
    console.log("🔄 Waiting for Confirm button...");
    setTimeout(clickConfirmButton, 250);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', clickConfirmButton);
} else {
  clickConfirmButton();
}