document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('[id^=add-todo]');
    const todoInputs = document.querySelectorAll('[id^=todo-input]');
    const listSelects = document.querySelectorAll('[id^=list-select]');
    const localStorageKey = 'geminiTasks'; // Use a consistent key

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];
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
        localStorage.setItem(localStorageKey, JSON.stringify(allTasks));
    }

    // Function to add a new task
    function addTask(todoInput, listSelect) {
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
        taskSpan.ondblclick = function() {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskSpan.textContent;
            input.onblur = function() {
                taskSpan.textContent = input.value;
                newTask.replaceChild(taskSpan, input);
                saveTasks(); // Update localStorage
            };
            input.onkeypress = function(event) {
                if (event.key === 'Enter') {
                    taskSpan.textContent = input.value;
                    newTask.replaceChild(taskSpan, input);
                    saveTasks(); // Update localStorage
                }
            };
            newTask.replaceChild(input, taskSpan);
            input.focus();
        };
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
    }

    // Add event listeners for button clicks
    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => addTask(todoInputs[index], listSelects[index]));
    });

    // Add event listeners for Enter key presses
    todoInputs.forEach((input, index) => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask(todoInputs[index], listSelects[index]);
            }
        });
    });

    // Make pre-added tasks editable and removable
    document.querySelectorAll('ol[id^="todo-list-"] li').forEach(item => {
        const taskText = item.textContent.trim();
        item.textContent = '';
        addTaskToList(taskText, false, item.parentElement.id);
    });

    // Load tasks when the page is loaded
    loadTasks();
    saveTasks(); // Ensure tasks are saved after loading
});