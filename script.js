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
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, status: 'pending' });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
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

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') addTask();
});

clearTasksBtn.addEventListener('click', clearTasks);

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
