/*************************************************
 * 1) EXISTING LOGIC FOR SPOTLIGHT SHORTCUTS
 *************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    const listSelect = document.getElementById('list-select');

    // Use a unique key for localStorage
    const storageKey = 'spotlightShortcutsTasks';

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

    // Add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        const selectedListId = listSelect.value;

        if (taskText !== '') {
            addTaskToList(taskText, false, selectedListId);
            todoInput.value = ''; 
            saveTasks(); 
        }
    }

    // Add a task to a specific list
    function addTaskToList(taskText, completed, listId) {
        const todoList = document.getElementById(listId);
        const newTask = document.createElement('li');
        newTask.style.position = 'relative';
        newTask.style.listStyleType = 'none';

        // Checkbox
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
            saveTasks();
        };

        // Task text (editable)
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.contentEditable = true;
        taskSpan.onblur = function() {
            saveTasks();
        };

        // Delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' x';
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'none';
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '0';
        deleteButton.onclick = function() {
            if (confirm('Are you sure you want to delete this task?')) {
                todoList.removeChild(newTask);
                saveTasks();
            }
        };

        // Append to the li
        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteButton);

        // Show the delete button on hover
        newTask.onmouseover = function() {
            deleteButton.style.display = 'inline';
        };
        newTask.onmouseout = function() {
            deleteButton.style.display = 'none';
        };

        // Finally add the newTask li to the selected list
        todoList.appendChild(newTask);
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
});

/*************************************************
 * 2) NEW: LOGIC FOR YOUR 8 CATEGORIES
 *************************************************/
// The array of new categories that go in rows of 4
const categories = [
  "Flagship Models",
  "Reasoning Models",
  "Real-Time Models",
  "Audio Models",
  "Image Models",
  "Text-to-Speech",
  "Embedding Models",
  "Moderation Models"
];

// After DOMContentLoaded, we also populate the categories
window.addEventListener('DOMContentLoaded', function() {
    const categoryGrid = document.getElementById('category-grid');
    
    // Create a <div> for each category
    categories.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.classList.add('category-item');
        catDiv.textContent = category;

        // (Optional) If you want a click event:
        // catDiv.addEventListener('click', () => {
        //   alert(`You clicked on ${category}`);
        // });

        categoryGrid.appendChild(catDiv);
    });
});
