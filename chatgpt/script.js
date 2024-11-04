document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoLists = document.querySelectorAll('ol[id^="todo-list-"]');

    // Load tasks from localStorage
    todoLists.forEach((list, index) => {
        const savedTasks = JSON.parse(localStorage.getItem(`todoList${index + 1}`)) || [];
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            list.appendChild(li);
        });
    });

    const addTask = () => {
        const task = todoInput.value.trim();
        if (task) {
            let added = false;
            todoLists.forEach((list, index) => {
                if (!added && list.children.length < 20) {
                    const li = document.createElement('li');
                    li.textContent = task;
                    list.appendChild(li);

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
}); 