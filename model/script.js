document.addEventListener('DOMContentLoaded', () => {
    // Use a unique localStorage key
    const storageKey = "MLShortcutApp"; 

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

    // ----- Functions -----

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed, task.listId);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const allTasks = [];
        document.querySelectorAll('ol').forEach(list => {
            const tasks = Array.from(list.children).map(task => ({
                text: task.querySelector('span')?.textContent || '',
                completed: task.querySelector('input')?.checked || false,
                listId: list.id
            }));
            allTasks.push(...tasks);
        });
        localStorage.setItem(storageKey, JSON.stringify(allTasks));
    }

    // Function to add a new task (by wrapperIndex, either 1 or 2)
    function addTask(wrapperIndex) {
        const todoInput = document.getElementById(`todo-input-${wrapperIndex}`);
        const listSelect = document.getElementById(`list-select-${wrapperIndex}`);
        const taskText = todoInput.value.trim();
        const selectedListId = listSelect.value;
        if (taskText !== '') {
            addTaskToList(taskText, false, selectedListId);
            todoInput.value = '';
            saveTasks();
        }
    }

    // Function to add a task to the specified list with a delete button and checkbox
    function addTaskToList(taskText, completed, listId) {
        const todoList = document.getElementById(listId);
        if (!todoList) return;

        const newTask = document.createElement('li');
        newTask.style.position = 'relative';
        newTask.style.listStyleType = 'none';

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.style.marginRight = '8px';
        checkbox.onchange = function() {
            if (checkbox.checked) {
                taskSpan.style.fontWeight = 'bold';
                taskSpan.style.color = 'purple';
            } else {
                taskSpan.style.fontWeight = 'normal';
                taskSpan.style.color = 'black';
            }
            saveTasks();
        };

        // Create the task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        if (completed) {
            taskSpan.style.fontWeight = 'bold';
            taskSpan.style.color = 'purple';
        }

        // Create the delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0';
        deleteButton.onclick = function() {
            todoList.removeChild(newTask);
            saveTasks();
        };

        // Hover effect to show/hide delete button
        newTask.onmouseover = function() {
            deleteButton.style.display = 'inline';
        };
        newTask.onmouseout = function() {
            deleteButton.style.display = 'none';
        };

        // Assemble the elements
        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteButton);

        // Add to the correct list
        todoList.appendChild(newTask);

        // Scroll into view if needed
        newTask.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // ----- Optional Theme Logic -----
    function saveTheme(theme) {
        localStorage.setItem('mlTheme', theme);
    }
    function loadTheme() {
        const theme = localStorage.getItem('mlTheme');
        if (theme) {
            applyTheme(theme);
        }
    }
    function applyTheme(theme) {
        document.body.className = theme;
    }
    document.getElementById('themeSelector').addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        applyTheme(selectedTheme);
        saveTheme(selectedTheme);
    });
    window.addEventListener('load', loadTheme);
});
