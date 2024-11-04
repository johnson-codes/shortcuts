document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const todoList1 = document.getElementById('todo-list-1');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('gptSearchTasks')) || [];
        tasks.forEach(taskText => {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            todoList1.appendChild(newTask);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(todoList1.children).map(task => task.textContent);
        localStorage.setItem('gptSearchTasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            todoList1.appendChild(newTask);
            todoInput.value = ''; // Clear the input field
            saveTasks(); // Save tasks to localStorage
        }
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