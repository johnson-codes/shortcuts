document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const listSelect = document.getElementById('list-select');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('androidsTasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed, task.listId);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const allTasks = [];
        document.querySelectorAll('ol').forEach(list => {
            const tasks = Array.from(list.children).map(task => ({
                text: task.querySelector('span').textContent,
                completed: task.querySelector('input').checked,
                listId: list.id
            }));
            allTasks.push(...tasks);
        });
        localStorage.setItem('androidsTasks', JSON.stringify(allTasks));
    }

    // Function to add a new task
    function addTask(wrapperIndex) {
        const todoInput = document.getElementById(`todo-input-${wrapperIndex}`);
        const listSelect = document.getElementById(`list-select-${wrapperIndex}`);
        const taskText = todoInput.value.trim();
        const selectedListId = listSelect.value;
        if (taskText !== '') {
            addTaskToList(taskText, false, selectedListId);
            todoInput.value = ''; // Clear the input field
            saveTasks(); // Save tasks to localStorage
        }
    }

    // Function to add a task to the specified list with a delete button and checkbox
    function addTaskToList(taskText, completed, listId) {
        const todoList = document.getElementById(listId);
        const newTask = document.createElement('li');
        newTask.style.position = 'relative'; // Ensure the list item is positioned relative
        newTask.style.listStyleType = 'none'; // Remove list style

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.style.marginRight = '8px'; // Ensure spacing between checkbox and text
        checkbox.onchange = function() {
            if (checkbox.checked) {
                taskSpan.style.fontWeight = 'bold';
                taskSpan.style.color = 'purple'; // Change to purple
            } else {
                taskSpan.style.fontWeight = 'normal';
                taskSpan.style.color = 'black';
            }
            saveTasks(); // Update localStorage
        };

        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        if (completed) {
            taskSpan.style.fontWeight = 'bold';
            taskSpan.style.color = 'purple'; // Change to purple
        }

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0'; // Position the "x" at the end
        deleteButton.onclick = function() {
            todoList.removeChild(newTask);
            saveTasks(); // Update localStorage
        };

        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteButton);
        newTask.onmouseover = function() {
            deleteButton.style.display = 'inline';
        };
        newTask.onmouseout = function() {
            deleteButton.style.display = 'none';
        };

        todoList.appendChild(newTask);

        // Scroll the new task into view
        newTask.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Add event listeners for both add buttons
    document.getElementById('add-todo-1').addEventListener('click', () => {
        addTask(1);
    });

    document.getElementById('add-todo-2').addEventListener('click', () => {
        addTask(2);
    });

    // Add event listeners for Enter key press on both input fields
    document.getElementById('todo-input-1').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(1);
        }
    });

    document.getElementById('todo-input-2').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(2);
        }
    });

    // Load tasks when the page is loaded
    loadTasks();

    // Function to save theme to local storage
    function saveTheme(theme) {
        localStorage.setItem('mlTheme', theme);
    }

    // Function to load theme from local storage
    function loadTheme() {
        const theme = localStorage.getItem('mlTheme');
        if (theme) {
            applyTheme(theme);
        }
    }

    // Function to apply the theme
    function applyTheme(theme) {
        document.body.className = theme; // Assuming themes are applied via body class
    }

    // Example usage: when a new theme is selected
    document.getElementById('themeSelector').addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        applyTheme(selectedTheme);
        saveTheme(selectedTheme);
    });

    // Call loadTheme on page load
    window.addEventListener('load', loadTheme);
});