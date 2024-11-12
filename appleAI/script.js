document.addEventListener('DOMContentLoaded', function() {
    // Focus on the input field when the page loads
    const todoInput1 = document.getElementById('todo-input-1');
    if (todoInput1) {
        todoInput1.focus();
    }

    // Load saved checkbox states
    loadCheckboxStates();

    // Load saved tasks
    loadTasks();

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

    // Add task event listeners
    document.getElementById('add-todo-1').addEventListener('click', function() {
        addTask('todo-input-1', 'list-select-1');
    });

    document.getElementById('add-todo-2').addEventListener('click', function() {
        addTask('todo-input-2', 'list-select-2');
    });

    // Add Enter key event listeners for input fields
    document.getElementById('todo-input-1').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask('todo-input-1', 'list-select-1');
        }
    });

    document.getElementById('todo-input-2').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask('todo-input-2', 'list-select-2');
        }
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

function addTask(inputId, selectId) {
    const input = document.getElementById(inputId);
    const listId = document.getElementById(selectId).value;
    const list = document.getElementById(listId);

    if (input.value.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = input.value;
        list.appendChild(listItem);

        console.log(`Added task: ${input.value} to list: ${listId}`);

        // Save tasks to local storage
        saveTasks();

        input.value = ''; // Clear the input field
    } else {
        console.log('No task entered.');
    }
}

function saveTasks() {
    const lists = document.querySelectorAll('ol');
    const tasks = {};

    lists.forEach(list => {
        tasks[list.id] = Array.from(list.children).map(item => item.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks saved to local storage:', tasks);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

    for (const [listId, items] of Object.entries(tasks)) {
        const list = document.getElementById(listId);
        if (list) {
            items.forEach(text => {
                const listItem = document.createElement('li');
                listItem.textContent = text;
                list.appendChild(listItem);
            });
        }
    }
    console.log('Tasks loaded from local storage:', tasks);
}

function navigateTo(url) {
    window.location.href = url;
} 