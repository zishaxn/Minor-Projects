const taskInput = document.querySelector("#input-task");
const listContainer = document.querySelector("#list-container");

function addTask() {
  if (taskInput.value === "") {
    alert("Task Can Not Be Empty");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = taskInput.value;
  listContainer.appendChild(li);
    taskInput.value = "";
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
}
