document.addEventListener('DOMContentLoaded', () => {
    const addButton1 = document.getElementById('add-todo-1');
    const todoInput1 = document.getElementById('todo-input-1');
    const listSelect1 = document.getElementById('list-select-1');
    const addButton2 = document.getElementById('add-todo-2');
    const todoInput2 = document.getElementById('todo-input-2');
    const listSelect2 = document.getElementById('list-select-2');

    // Use a unique key for localStorage
    const storageKey = `pixelAppTasks_${new Date().toISOString().split('T')[0]}`; // Updated key

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
                text: task.querySelector('span').textContent,
                completed: task.querySelector('input').checked,
                listId: list.id
            }));
            allTasks.push(...tasks);
        });
        localStorage.setItem(storageKey, JSON.stringify(allTasks));
    }

    // Function to add a new task
    function addTask(input, select) {
        const taskText = input.value.trim();
        const selectedListId = select.value;
        if (taskText !== '') {
            addTaskToList(taskText, false, selectedListId);
            input.value = ''; // Clear the input field
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

        // Create task text span with editing capability
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.contentEditable = true; // Allow editing
        taskSpan.onblur = function() {
            saveTasks(); // Save changes after editing
        };

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0'; // Position the "x" at the end
        deleteButton.onclick = function() {
            if (confirm('Are you sure you want to delete this task?')) {
                todoList.removeChild(newTask);
                saveTasks(); // Update localStorage
            }
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
    }

    // Use event delegation for better performance
    document.querySelectorAll('ol').forEach(list => {
        list.addEventListener('click', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
                const taskSpan = event.target.nextElementSibling;
                if (event.target.checked) {
                    taskSpan.style.fontWeight = 'bold';
                    taskSpan.style.color = 'purple';
                } else {
                    taskSpan.style.fontWeight = 'normal';
                    taskSpan.style.color = 'black';
                }
                saveTasks();
            }
        });
    });

    // Add event listener for button click
    addButton1.addEventListener('click', () => addTask(todoInput1, listSelect1));
    addButton2.addEventListener('click', () => addTask(todoInput2, listSelect2));

    // Add event listener for Enter key press
    todoInput1.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(todoInput1, listSelect1);
        }
    });
    todoInput2.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(todoInput2, listSelect2);
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
});