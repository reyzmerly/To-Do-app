document.addEventListener("DOMContentLoaded", function () {
  // Code to Load tasks from local storage
  loadTasks();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    //Code to Create a new task item
    const taskList = document.getElementById("taskList");
    const newTask = document.createElement("li");
    newTask.innerHTML = `
      <input type="checkbox">
      <span class="task-text" onclick="editTask(this)">${taskText}</span>
      <button onclick="deleteTask(this)">Delete</button>
      <button onclick="togglePin(this)">Pin</button>
    `;

    // Code for If the task is pinned, insert it at the top, otherwise, after pinned tasks
    const pinnedTasks = document.querySelectorAll(".pinned");
    if (pinnedTasks.length > 0) {
      taskList.insertBefore(newTask, pinnedTasks[0]);
    } else {
      taskList.insertBefore(newTask, taskList.firstChild);
    }

    // Code to Save tasks to local storage
    saveTasks();

    // Code to Clear the input field
    taskInput.value = "";
  }
}

function deleteTask(button) {
  const taskItem = button.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);

  //Code to Save tasks to local storage
  saveTasks();
}

function togglePin(button) {
  const taskItem = button.parentNode;
  taskItem.classList.toggle("pinned");

  // Code to Save tasks to local storage
  saveTasks();
}

function editTask(span) {
  const taskText = span.innerText;
  const newText = prompt("Edit task:", taskText);

  if (newText !== null) {
    span.innerText = newText;

    // Save tasks to local storage
    saveTasks();
  }
}

function handleTaskClick(event) {
  if (event.target.type === "checkbox") {
    const taskItem = event.target.parentNode;
    taskItem.classList.toggle("completed");

    saveTasks();
  }
}

function saveTasks() {
  const taskList = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", taskList);
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}

function handleKeyPress(event) {
  const keyCode = event.keyCode;

  if (keyCode === 13) {
    //Code to Enter key pressed
    addTask();
  } else if (keyCode === 46) {
    //Code to Delete key pressed
    const focusedElement = document.activeElement;

    if (focusedElement.tagName === "SPAN" && focusedElement.classList.contains("task-text")) {
      const taskItem = focusedElement.parentNode;
      deleteTask(taskItem);
    }
  }
}
