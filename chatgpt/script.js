document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoLists = document.querySelectorAll('ol[id^="todo-list-"]');

    // Load tasks from localStorage
    todoLists.forEach((list, index) => {
        const savedTasks = JSON.parse(localStorage.getItem(`todoList${index + 1}`)) || [];
        savedTasks.forEach(task => {
            addTodoItem(list, task, index);
        });
    });

    const addTask = () => {
        const task = todoInput.value.trim();
        if (task) {
            let added = false;
            todoLists.forEach((list, index) => {
                if (!added && list.children.length < 20) {
                    addTodoItem(list, task, index);

                    // Save to localStorage
                    const tasks = JSON.parse(localStorage.getItem(`todoList${index + 1}`)) || [];
                    tasks.push(task);
                    localStorage.setItem(`todoList${index + 1}`, JSON.stringify(tasks));

                    added = true;
                }
            });

            todoInput.value = ''; // Clear input
        }
    };

    addTodoButton.addEventListener('click', addTask);

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTodoItem(todoList, taskText, listIndex) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.textContent = taskText;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'x';
        removeBtn.onclick = function() {
            todoList.removeChild(listItem);

            // Update localStorage
            const tasks = JSON.parse(localStorage.getItem(`todoList${listIndex + 1}`)) || [];
            const taskIndex = tasks.indexOf(taskText);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                localStorage.setItem(`todoList${listIndex + 1}`, JSON.stringify(tasks));
            }
        };

        listItem.appendChild(removeBtn);
        todoList.appendChild(listItem);
    }
}); 