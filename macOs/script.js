document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const todoList1 = document.getElementById('todo-list-1');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('macOsTasks')) || [];
        tasks.forEach(taskText => {
            addTaskToList(taskText);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(todoList1.children).map(task => task.textContent.slice(0, -1));
        localStorage.setItem('macOsTasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText);
            todoInput.value = ''; // Clear the input field
            saveTasks(); // Save tasks to localStorage
        }
    }

    // Function to add a task to the list with a delete button
    function addTaskToList(taskText) {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
        newTask.style.position = 'relative'; // Ensure the list item is positioned relative

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0'; // Position the "x" at the end
        deleteButton.onclick = function() {
            todoList1.removeChild(newTask);
            saveTasks(); // Update localStorage
        };

        newTask.appendChild(deleteButton);
        newTask.onmouseover = function() {
            deleteButton.style.display = 'inline';
        };
        newTask.onmouseout = function() {
            deleteButton.style.display = 'none';
        };

        todoList1.appendChild(newTask);
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