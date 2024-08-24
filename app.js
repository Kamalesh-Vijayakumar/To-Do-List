window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task));
};

function fn() {
  let v = document.getElementById("input").value;
  if (v === "") {
    alert("Enter the Task");
    return;
  }
  document.getElementById("input").value = "";

  createTaskElement(v);
  saveTask(v);
}

function createTaskElement(taskText) {
  let list = document.createElement("li");
  let delbtn = document.createElement("button");
  let edit = document.createElement("button");
  let testtext = document.createElement("span");

  testtext.innerText = taskText;

  delbtn.innerText = "Delete";
  edit.innerText = "Edit";

  delbtn.classList.add("delete");
  edit.classList.add("edit");

  list.appendChild(testtext);
  list.appendChild(edit);
  list.appendChild(delbtn);

  document.getElementById("display").appendChild(list);

  delbtn.addEventListener("click", () => {
    list.remove();
    deleteTask(taskText);
  });

  edit.addEventListener("click", () => {
    let newvalue = prompt("Edit the task", testtext.innerText);
    if (newvalue !== null && newvalue !== "") {
      testtext.innerText = newvalue;
      updateTask(taskText, newvalue);
    }
  });
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t === oldTask ? newTask : t));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
