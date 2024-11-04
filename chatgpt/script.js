document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Function to add a new task
    function addTask() {
        const taskText = input.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            todoList.appendChild(listItem);
            input.value = ''; // Clear the input field
        }
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
}); 