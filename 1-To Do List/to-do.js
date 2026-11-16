// DOM Elements //

const taskInput = document.querySelector(".task-input input");
const addButton = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");
const navLinks = document.querySelectorAll(".navigation a");

// Dynamic Date

const dateDisplay = document.querySelector(".date span");

const currentDate = new Date();

dateDisplay.textContent = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
});

// Add task function //

addButton.addEventListener("click", function() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.dataset.date = new Date().toISOString().split("T")[0];

    taskItem.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">×</button>
        `;

        taskList.appendChild(taskItem);
        saveTasks();

        taskInput.value = "";
 
});

// Enter Key Support

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addButton.click();
    }

});

// Delete task function //

taskList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {
          
        const taskItem = event.target.closest(".task-item");

        taskItem.remove();
        saveTasks();
    }
});

// complete task function //

taskList.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {

        const taskItem = event.target.closest(".task-item");

        if (event.target.checked) {
            taskItem.classList.add("completed");
        }else {
            taskItem.classList.remove("completed");
        }
    }
        saveTasks();
});

// task filter //

// Mark existing tasks with today's date //

document.querySelectorAll(".task-item").forEach(task => {
    task.dataset.date = new Date().toISOString().split("T")[0];
});

navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        navLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");

        const filter = this.dataset.filter;
        const today = new Date().toISOString().split("T")[0];

        document.querySelectorAll(".task-item").forEach(task => {

            const isCompleted = task.querySelector("input[type='checkbox']").checked;
            const isToday = task.dataset.date === today;

            if (filter === "all") {
                task.style.display = "flex";
            }
            else if (filter === "today") {
                task.style.display = isToday ? "flex" : "none";
            }
            else if (filter === "completed") {
                task.style.display = isCompleted ? "flex" : "none";
            }

        });

    });

});


// Save Tasks

function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task-item").forEach(task => {

        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("input").checked,
            date: task.dataset.date
        });

    });

    localStorage.setItem("darkFlowTasks", JSON.stringify(tasks));

}


// Load Tasks

function loadTasks() {

    const savedTasks = localStorage.getItem("darkFlowTasks");

    if (savedTasks === null) {
        saveTasks();
        return;
    }

    const tasks = JSON.parse(savedTasks);

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "×";

        taskItem.dataset.date = task.date;

        taskItem.append(checkbox, span, deleteButton);

        taskList.appendChild(taskItem);

    });

}

loadTasks();