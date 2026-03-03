function toggleMenu() {
    const popup = document.getElementById("menuPopup");
    popup.classList.toggle("open");
}

fetch('menu.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('menuPopup').innerHTML = html;
    });

function expandShelf(element) {
    // This allows you to click to open, and click again to close
    element.classList.toggle('expanded');
}