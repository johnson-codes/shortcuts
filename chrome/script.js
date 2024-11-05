document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const listSelect = document.getElementById('list-select');

    // Use a fixed localStorage key for testing
    const localStorageKey = 'chromeTasks_test';

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        console.log('Loaded tasks:', tasks); // Debugging
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
        console.log('Saving tasks:', allTasks); // Debugging
        localStorage.setItem(localStorageKey, JSON.stringify(allTasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        const selectedListId = listSelect.value;
        console.log('Adding task:', taskText, 'to list:', selectedListId); // Debugging
        if (taskText !== '') {
            addTaskToList(taskText, false, selectedListId);
            todoInput.value = ''; // Clear the input field
            saveTasks(); // Save tasks to localStorage
        } else {
            console.log('Task input is empty.'); // Debugging
        }
    }

    // Function to add a task to the specified list
    function addTaskToList(taskText, completed, listId) {
        const todoList = document.getElementById(listId);
        if (!todoList) {
            console.error('Todo list not found:', listId); // Debugging
            return;
        }
        
        const newTask = document.createElement('li');
        newTask.className = 'todo-item'; // Add class for styling
        newTask.style.position = 'relative'; // Ensure the list item is positioned relative
        newTask.style.listStyleType = 'none'; // Remove list style

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.className = 'remove-btn'; // Add class for styling
        deleteButton.style.cursor = 'pointer';
        deleteButton.onclick = function() {
            todoList.removeChild(newTask);
            saveTasks(); // Update localStorage
        };

        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteButton);
        todoList.appendChild(newTask);
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key press
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
}); 