let taskList = [];
let themeToggle = document.querySelector(".toggle-theme");
let addBtn = document.querySelector(".add-btn");
let searchInput = document.querySelector(".search");
let listEl = document.querySelector(".list");

// Обновить иконку в зависимости от темы
function updateThemeIcon() {
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

// Добавить задачу
function addTask() {
  let value = searchInput.value.trim();
  if (value) {
    taskList.push({ text: value, completed: false });
    renderTasks();
    searchInput.value = "";
  }
}

// Кнопка SEND
addBtn.addEventListener("click", addTask);

// Enter для быстрого добавления
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Переключить тему
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  updateThemeIcon();
});

// Отрисовка списка
function renderTasks() {
  listEl.innerHTML = "";

  let filter = searchInput.value.toLowerCase();

  taskList.forEach((task, index) => {
    if (!task.text.toLowerCase().includes(filter)) return;

    let li = document.createElement("li");
    li.className = "item";

    let left = document.createElement("div");
    left.className = "item-left";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    let span = document.createElement("span");
    span.className = "item-text";
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    left.appendChild(checkbox);
    left.appendChild(span);

    let actions = document.createElement("div");
    actions.className = "actions";

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => {
      let newText = prompt("Edit task:", task.text);
      if (newText !== null) {
        task.text = newText;
        renderTasks();
      }
    });

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.addEventListener("click", () => {
      taskList.splice(index, 1);
      renderTasks();
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
}

// Live поиск
searchInput.addEventListener("input", renderTasks);

// Первая иконка по теме
updateThemeIcon();
renderTasks();







