document.getElementById('add-todo').addEventListener('click', addTaskFromInput);
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTaskFromInput();
    }
});

function addTaskFromInput() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
}

function addTask(taskText) {
    const containers = document.querySelectorAll('.todo-list-container ul');
    let added = false;

    containers.forEach((container, index) => {
        if (!added && container.children.length < 20) {
            const taskNumber = index * 20 + container.children.length + 1;
            const listItem = document.createElement('li');
            listItem.textContent = `${taskNumber}. ${taskText}`;
            container.appendChild(listItem);
            added = true;
        }
    });

    if (!added) {
        alert('All containers are full!');
    }
} 