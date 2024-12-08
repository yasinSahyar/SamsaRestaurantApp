//footer-map.js
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map').setView([60.192059, 24.945831], 13); // Coordinates for Helsinki, Finland

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker
    L.marker([60.192059, 24.945831])
        .addTo(map)
        .bindPopup('<b>Our Location</b><br>Helsinki, Finland')
        .openPopup();
});