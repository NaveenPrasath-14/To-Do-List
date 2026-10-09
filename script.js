const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const ul = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    ul.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            ${index + 1}. ${task}
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        ul.appendChild(li);
    });
}

btn.addEventListener("click", () => {

    let value = input.value.trim();

    if (value === "") {
        alert("Please enter a task");
        return;
    }

    if (editIndex === -1) {

        // ADD
        tasks.push(value);

    } else {

        // UPDATE
        tasks[editIndex] = value;

        editIndex = -1;

        btn.textContent = "Add";
    }

    save();
    displayTasks();

    input.value = "";
});

function editTask(index) {

    input.value = tasks[index];

    editIndex = index;

    btn.textContent = "Update";

    input.focus();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    save();

    displayTasks();
}

displayTasks();