document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const lists = document.querySelectorAll('ol');
    let draggedItem = null;

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText, false);
            todoInput.value = ''; // Clear the input field
        }
    }

    // Function to add a task to the list with a delete button and checkbox
    function addTaskToList(taskText, completed) {
        const newTask = document.createElement('li');
        newTask.style.position = 'relative';
        newTask.style.listStyleType = 'none';
        newTask.setAttribute('draggable', true);

        // Create checkbox
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
        };

        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        if (completed) {
            taskSpan.style.fontWeight = 'bold';
            taskSpan.style.color = 'purple';
        }

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0';
        deleteButton.onclick = function() {
            newTask.parentElement.removeChild(newTask);
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

        // Add drag events
        newTask.addEventListener('dragstart', (e) => {
            draggedItem = newTask;
            setTimeout(() => {
                newTask.style.display = 'none';
            }, 0);
        });

        newTask.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        lists[0].appendChild(newTask); // Add to the first list by default
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key press
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Add drag and drop events to lists
    lists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        list.addEventListener('dragenter', (e) => {
            e.preventDefault();
            list.style.background = '#e0e0e0'; // Highlight the list
        });

        list.addEventListener('dragleave', () => {
            list.style.background = '';
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            list.style.background = '';
            if (draggedItem) {
                list.appendChild(draggedItem);
            }
        });
    });
}); 