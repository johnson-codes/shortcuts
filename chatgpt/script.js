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
            const list = todoLists[0]; // Add to the first list as an example
            const li = document.createElement('li');
            li.textContent = task;
            list.appendChild(li);

            // Save to localStorage
            const tasks = JSON.parse(localStorage.getItem('todoList1')) || [];
            tasks.push(task);
            localStorage.setItem('todoList1', JSON.stringify(tasks));

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