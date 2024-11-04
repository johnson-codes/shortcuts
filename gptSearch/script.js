document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            // Simulate a search operation
            searchResults.innerHTML = `<p>Results for: <strong>${query}</strong></p>`;
            searchInput.value = ''; // Clear input
        }
    };

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}); 