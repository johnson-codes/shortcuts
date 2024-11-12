document.addEventListener('DOMContentLoaded', function() {
    // Focus on the input field when the page loads
    const todoInput1 = document.getElementById('todo-input-1');
    if (todoInput1) {
        todoInput1.focus();
    }

    // Load saved checkbox states
    loadCheckboxStates();

    // Existing chat widget code
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');

    // Toggle chat container visibility
    chatButton.addEventListener('click', function() {
        chatContainer.classList.toggle('active');
    });

    // Close chat container
    closeChat.addEventListener('click', function() {
        chatContainer.classList.remove('active');
    });

    // Add event listeners to checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveCheckboxState(this);
        });
    });
});

function saveCheckboxState(checkbox) {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    checkboxStates[checkbox.id] = checkbox.checked;
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

function loadCheckboxStates() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    for (const [id, checked] of Object.entries(checkboxStates)) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = checked;
        }
    }
}

function navigateTo(url) {
    window.location.href = url;
} 