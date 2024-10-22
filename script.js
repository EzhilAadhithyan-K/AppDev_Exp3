const taskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');
const clearTasksBtn = document.querySelector('#clear-tasks-btn');
const filterButtons = document.querySelectorAll('.control-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function renderTasks() {
  taskList.innerHTML = '';
  tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === task.status;
  }).forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status}`;
    li.innerHTML = `
      <input type="checkbox" id="task-${index}" ${task.status === 'completed' ? 'checked' : ''}>
      <label for="task-${index}" class="complete-btn" onclick="toggleTask(${index})">
        <i class="fas fa-check"></i>
      </label>
      <span class="task-name">${task.name}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskName = taskInput.value.trim(); // Ensure there's no extra space
  if (taskName) {
    tasks.push({ name: taskName, status: 'pending' });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = ''; // Clear the input field
    renderTasks(); // Re-render the task list
  } else {
    alert("Task cannot be empty!"); // Alert if the task input is empty
  }
}

function toggleTask(index) {
  tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function clearTasks() {
  tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Event listeners
addTaskBtn.addEventListener('click', addTask); // Add task on button click

taskInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') addTask(); // Add task on pressing Enter key
});

clearTasksBtn.addEventListener('click', clearTasks); // Clear all tasks

filterButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    filter = e.target.dataset.state;
    filterButtons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    renderTasks();
  });
});

// Initialize rendering of tasks
renderTasks();
