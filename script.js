document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <div class="task-actions">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
            <button class="complete-button">${task.completed ? 'Uncomplete' : 'Complete'}</button>
          </div>
        `;
        taskList.appendChild(taskItem);
  
        const editButton = taskItem.querySelector('.edit-button');
        const deleteButton = taskItem.querySelector('.delete-button');
        const completeButton = taskItem.querySelector('.complete-button');
  
        editButton.addEventListener('click', () => editTask(index));
        deleteButton.addEventListener('click', () => deleteTask(index));
        completeButton.addEventListener('click', () => toggleCompleteTask(index));
      });
    };
  
    const addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    };
  
    const editTask = (index) => {
      const newTaskText = prompt('Edit your task', tasks[index].text);
      if (newTaskText) {
        tasks[index].text = newTaskText;
        saveTasks();
        renderTasks();
      }
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
    const toggleCompleteTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
    renderTasks();
  });
  