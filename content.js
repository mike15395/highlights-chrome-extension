document.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    // Show an alert with the selected text
    alert(`Selected text: \n\n"${selectedText}"`);

    // Save the selected text after the alert is closed
    saveHighlight(selectedText);
  }
});

// Function to save the selected text into local storage
function saveHighlight(text) {
  chrome.storage.local.get({ highlights: [] }, (result) => {
    const newHighlights = [
      ...result.highlights,
      { text: text, created: new Date().toISOString() },
    ];
    chrome.storage.local.set({ highlights: newHighlights }, () => {
      console.log("Highlight saved:", text); // For debugging
    });
  });
}
