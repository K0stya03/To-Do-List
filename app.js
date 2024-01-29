document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('taskLists') === null) {
    localStorage.setItem('taskLists', JSON.stringify([]));
  } else {
    displayTaskLists();
    displayTasks();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function displayCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    currentTimeElement.textContent = formattedDate;
  }
  displayCurrentTime();
  setInterval(displayCurrentTime, 1000);
});

function showInputPopup() {
  document.getElementById('inputPopup').style.display = 'block';
}

function createNewListFromInput() {
  let listNameInput = document.getElementById('listNameInput');
  let listName = listNameInput.value.trim();

  if (!listName) {
    alert('Будь ласка, введіть назву списку.');
    return;
  }

  let taskLists = JSON.parse(localStorage.getItem('taskLists'));

  if (taskLists.some(list => list.name === listName)) {
    alert('Список з такою назвою вже існує.');
    return;
  }

  taskLists.push({ name: listName, tasks: [] });
  localStorage.setItem('taskLists', JSON.stringify(taskLists));

  displayTaskLists();
  displayTasks();

  document.getElementById('inputPopup').style.display = 'none';
  listNameInput.value = '';
}

function cancelInput() {
  document.getElementById('inputPopup').style.display = 'none';
  document.getElementById('listNameInput').value = '';
}

function addTask() {
  let newTaskText = document.getElementById('newTask').value;

  if (newTaskText.trim() === '') {
    alert('Будь ласка, введіть текст справи.');
    return;
  }

  let currentListIndex = document.getElementById('listSelect').selectedIndex;
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  let tasks = taskLists[currentListIndex].tasks;

  tasks.push({ text: newTaskText, completed: false });
  localStorage.setItem('taskLists', JSON.stringify(taskLists));
  displayTasks();
}



function displayTaskLists() {
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  let listSelect = document.getElementById('listSelect');
  listSelect.innerHTML = '';
  taskLists.forEach(function (list, index) {
    let option = document.createElement('option');
    option.value = index;
    option.text = list.name;
    listSelect.add(option);
  });
}

function changeList() {
  displayTasks();
}

function displayTasks() {
  let currentListIndex = document.getElementById('listSelect').selectedIndex;
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  let tasks = taskLists[currentListIndex].tasks;
  let taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="completeTask(${index})" class="completeTask">Done</button>
      <button onclick="deleteTask(${index})" class="deleteTask">❌</button>
    `;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    taskList.appendChild(listItem);
  });
}

function completeTask(index) {
  let currentListIndex = document.getElementById('listSelect').selectedIndex;
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  let tasks = taskLists[currentListIndex].tasks;
  tasks[index].completed = !tasks[index].completed; 
  localStorage.setItem('taskLists', JSON.stringify(taskLists));
  displayTasks();
  toggleButtonClass('.completeTask', index, 'completed'); 
}

function toggleButtonClass(selector, index, className) {
  let buttons = document.querySelectorAll(selector);
  buttons[index].classList.toggle(className);
}

function changeButtonColor(selector, index, color) {
  let buttons = document.querySelectorAll(selector);
  buttons[index].style.backgroundColor = color;
}

function deleteTask(index) {
  let currentListIndex = document.getElementById('listSelect').selectedIndex;
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  let tasks = taskLists[currentListIndex].tasks;
  tasks.splice(index, 1);
  localStorage.setItem('taskLists', JSON.stringify(taskLists));
  displayTasks();
}


function deleteList() {
  let currentListIndex = document.getElementById('listSelect').selectedIndex;
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));
  taskLists.splice(currentListIndex, 1);
  localStorage.setItem('taskLists', JSON.stringify(taskLists));
  displayTaskLists();
  displayTasks();
}
