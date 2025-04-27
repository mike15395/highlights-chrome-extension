function loadHighlights() {
  chrome.storage.local.get({ highlights: [] }, (data) => {
    const list = document.getElementById("highlightsList");
    list.innerHTML = "";

    data.highlights.forEach((highlight, index) => {
      const item = document.createElement("div");
      item.className = "highlightItem";
      item.innerHTML = `
          <p>${highlight.text}</p>
          <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
      list.appendChild(item);
    });

    // Add delete functionality
    document.querySelectorAll(".deleteBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        deleteHighlight(parseInt(idx));
      });
    });
  });
}

function deleteHighlight(index) {
  chrome.storage.local.get({ highlights: [] }, (data) => {
    const updatedHighlights = data.highlights.filter((_, i) => i !== index);
    chrome.storage.local.set({ highlights: updatedHighlights }, () => {
      loadHighlights(); // Refresh list
    });
  });
}

// When popup loads
document.addEventListener("DOMContentLoaded", loadHighlights);
