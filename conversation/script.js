document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage using a unique key for conversation practice
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('conversationPracticeTasks')) || [];
      tasks.forEach(task => {
        addTaskToList(task.text, task.completed, task.listId);
      });
    }
  
    // Save tasks to localStorage with the new unique key
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
      localStorage.setItem('conversationPracticeTasks', JSON.stringify(allTasks));
    }
  
    // Function to add a new task based on which input triggered it
    function addTask(wrapperIndex) {
      const todoInput = document.getElementById(`todo-input-${wrapperIndex}`);
      const listSelect = document.getElementById(`list-select-${wrapperIndex}`);
      const taskText = todoInput.value.trim();
      const selectedListId = listSelect.value;
      if (taskText !== '') {
        addTaskToList(taskText, false, selectedListId);
        todoInput.value = ''; 
        saveTasks();
      }
    }
  
    // Function to add a task to a specified list
    function addTaskToList(taskText, completed, listId) {
      const todoList = document.getElementById(listId);
      const newTask = document.createElement('li');
      newTask.style.position = 'relative';
      newTask.style.listStyleType = 'none';
  
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
  
      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
      if (completed) {
        taskSpan.style.fontWeight = 'bold';
        taskSpan.style.color = 'purple';
      }
  
      const deleteButton = document.createElement('span');
      deleteButton.textContent = ' x';
      deleteButton.style.color = 'red';
      deleteButton.style.cursor = 'pointer';
      deleteButton.style.display = 'none';
      deleteButton.style.position = 'absolute';
      deleteButton.style.right = '0';
      deleteButton.onclick = function() {
        todoList.removeChild(newTask);
        saveTasks();
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
      newTask.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  
    document.getElementById('add-todo-1').addEventListener('click', () => {
      addTask(1);
    });
  
    document.getElementById('add-todo-2').addEventListener('click', () => {
      addTask(2);
    });
  
    document.getElementById('todo-input-1').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask(1);
      }
    });
  
    document.getElementById('todo-input-2').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask(2);
      }
    });
  
    loadTasks();
  
    function saveTheme(theme) {
      localStorage.setItem('mlTheme', theme);
    }
  
    function loadTheme() {
      const theme = localStorage.getItem('mlTheme');
      if (theme) {
        applyTheme(theme);
      }
    }
  
    function applyTheme(theme) {
      document.body.className = theme;
    }
  
    document.getElementById('themeSelector')?.addEventListener('change', (event) => {
      const selectedTheme = event.target.value;
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    });
  
    window.addEventListener('load', loadTheme);
  });
  