// 1. SELECTING HTML ELEMENTS

const timerDisplay = document.getElementById("timerDisplay");
const timerStatus = document.getElementById("timerStatus");
const progressRing = document.getElementById("progressRing");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const focusTab = document.getElementById("focusTab");
const shortBreakTab = document.getElementById("shortBreakTab");
const longBreakTab = document.getElementById("longBreakTab");

const completedSessions = document.getElementById("completedSessions");



// 2. TIMER CONFIGURATION

const timerModes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

let currentMode = "focus";

let totalTime = timerModes.focus;

let remainingTime = totalTime;

let timerInterval = null;

let isRunning = false;

let endTime = null;

let sessionCount = Number(
    localStorage.getItem("pomoSessions")
) || 0;


// Circular Timer Configuration

const circumference = 2 * Math.PI * 118;

progressRing.style.strokeDasharray = circumference;



// 3. FORMAT TIMER

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );

}



// 4. UPDATE TIMER DISPLAY

function updateTimerDisplay() {

    timerDisplay.textContent = formatTime(remainingTime);

    const progress = remainingTime / totalTime;

    const offset = circumference * (1 - progress);

    progressRing.style.strokeDashoffset = offset;

    completedSessions.textContent = sessionCount;

    document.title = `${formatTime(remainingTime)} | POMO`;

}



// 5. UPDATE TIMER BUTTON

function updateStartButton() {

    if (isRunning) {

        startBtn.classList.remove("start-btn");

        startBtn.classList.add("pause-btn");

        startBtn.innerHTML = `
            <i class="fa-solid fa-pause"></i>
            <span>Pause</span>
        `;

    } else {

        startBtn.classList.remove("pause-btn");

        startBtn.classList.add("start-btn");

        startBtn.innerHTML = `
            <i class="fa-solid fa-play"></i>
            <span>Start</span>
        `;

    }

}



// 6. UPDATE ACTIVE SESSION TAB

function updateActiveTab() {

    focusTab.classList.remove("active");

    shortBreakTab.classList.remove("active");

    longBreakTab.classList.remove("active");


    if (currentMode === "focus") {

        focusTab.classList.add("active");

        timerStatus.textContent = "Focus in progress";

    }

    else if (currentMode === "shortBreak") {

        shortBreakTab.classList.add("active");

        timerStatus.textContent = "Short break in progress";

    }

    else {

        longBreakTab.classList.add("active");

        timerStatus.textContent = "Long break in progress";

    }

}



// 7. START TIMER


function startTimer() {

    if (isRunning) return;

    isRunning = true;

    endTime = Date.now() + remainingTime * 1000;

    updateStartButton();

    timerInterval = setInterval(updateCountdown, 250);

    saveTimerState();

}



// 8. COUNTDOWN FUNCTION

function updateCountdown() {

    remainingTime = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
    );

    updateTimerDisplay();

    if (remainingTime <= 0) {

        completeSession();

    }

    saveTimerState();

}



// 9. PAUSE TIMER

function pauseTimer() {

    if (!isRunning) return;

    remainingTime = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
    );

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    endTime = null;

    updateStartButton();

    updateTimerDisplay();

    saveTimerState();

}



// 10. RESET TIMER

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    endTime = null;

    remainingTime = totalTime;

    updateStartButton();

    updateTimerDisplay();

    saveTimerState();

}



// 11. SWITCH SESSION MODE

function switchMode(mode) {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    endTime = null;

    currentMode = mode;

    totalTime = timerModes[mode];

    remainingTime = totalTime;

    updateActiveTab();

    updateStartButton();

    updateTimerDisplay();

    saveTimerState();

}


// ========================================
// 12. COMPLETE SESSION
// ========================================

function completeSession() {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    endTime = null;

    remainingTime = 0;

    updateTimerDisplay();

    // Focus Session Completed

    if (currentMode === "focus") {

        sessionCount++;

        localStorage.setItem(
            "pomoSessions",
            sessionCount
        );

        // Every 4 sessions = Long Break

        if (sessionCount % 4 === 0) {

            switchMode("longBreak");

        } else {

            switchMode("shortBreak");

        }

    }

    // Break Completed

    else {

        switchMode("focus");

    }

    // Notification

    if ("Notification" in window &&
        Notification.permission === "granted") {

        new Notification("POMO Timer", {
            body: "Your session is complete! Time for the next session."
        });

    }

    saveTimerState();

}


// ========================================
// 13. TIMER EVENT LISTENERS
// ========================================

startBtn.addEventListener("click", function () {

    if (isRunning) {

        pauseTimer();

    } else {

        startTimer();

    }

});


resetBtn.addEventListener("click", resetTimer);


// Focus Tab

focusTab.addEventListener("click", function () {

    switchMode("focus");

});


// Short Break Tab

shortBreakTab.addEventListener("click", function () {

    switchMode("shortBreak");

});


// Long Break Tab

longBreakTab.addEventListener("click", function () {

    switchMode("longBreak");

});

// ========================================
// 14. TASK ELEMENTS
// ========================================

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const completedTaskList = document.getElementById(
    "completedTaskList"
);

const taskCount = document.getElementById("taskCount");

const emptyTaskMessage = document.getElementById(
    "emptyTaskMessage"
);


// ========================================
// 15. LOAD SAVED TASKS
// ========================================

let tasks = JSON.parse(
    localStorage.getItem("pomoTasks")
) || [];


// ========================================
// 16. SAVE TASKS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "pomoTasks",
        JSON.stringify(tasks)
    );

}


// ========================================
// 17. RENDER TASKS
// ========================================

function renderTasks() {

    taskList.innerHTML = "";

    completedTaskList.innerHTML = "";

    const activeTasks = tasks.filter(
        task => !task.completed
    );

    const finishedTasks = tasks.filter(
        task => task.completed
    );


    // Task Counter

    taskCount.textContent =
        `${activeTasks.length} Tasks`;


    // Empty Message

    if (activeTasks.length === 0) {

        emptyTaskMessage.style.display = "flex";

        taskList.appendChild(emptyTaskMessage);

    } else {

        emptyTaskMessage.style.display = "none";

    }


    // Render Active Tasks

    activeTasks.forEach(task => {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);

    });


    // Render Completed Tasks

    if (finishedTasks.length === 0) {

        completedTaskList.innerHTML = `
            <p class="empty-completed">
                No completed tasks yet.
            </p>
        `;

    } else {

        finishedTasks.forEach(task => {

            const taskElement = createTaskElement(task);

            completedTaskList.appendChild(taskElement);

        });

    }

}


// ========================================
// 18. CREATE TASK ELEMENT
// ========================================

function createTaskElement(task) {

    const taskItem = document.createElement("div");

    taskItem.className = "task-item";

    taskItem.dataset.id = task.id;


    // Checkbox

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = task.completed;

    checkbox.className = "task-checkbox";


    // Task Text

    const taskText = document.createElement("span");

    taskText.textContent = task.text;


    // Delete Button

    const deleteBtn = document.createElement("button");

    deleteBtn.className = "task-delete";

    deleteBtn.innerHTML = `
        <i class="fa-solid fa-trash"></i>
    `;

    deleteBtn.setAttribute("aria-label", "Delete task");


    // Append Elements

    taskItem.appendChild(checkbox);

    taskItem.appendChild(taskText);

    taskItem.appendChild(deleteBtn);


    return taskItem;

}


// ========================================
// 19. ADD NEW TASK
// ========================================

function addTask() {

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        taskInput.focus();

        return;

    }


    const newTask = {

        id: Date.now().toString(),

        text: taskText,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    renderTasks();


    taskInput.value = "";

    taskInput.focus();

}


// ========================================
// 20. ADD TASK EVENT LISTENERS
// ========================================

addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ========================================
// 21. COMPLETE OR UNCOMPLETE TASK
// ========================================

function toggleTask(taskId) {

    tasks = tasks.map(task => {

        if (task.id === taskId) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    renderTasks();

}


// ========================================
// 22. DELETE TASK
// ========================================

function deleteTask(taskId) {

    tasks = tasks.filter(
        task => task.id !== taskId
    );

    saveTasks();

    renderTasks();

}


// ========================================
// 23. TASK EVENT DELEGATION
// ========================================

function handleTaskActions(event) {

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) return;

    const taskId = taskItem.dataset.id;


    // Checkbox Click

    if (event.target.matches(".task-checkbox")) {

        toggleTask(taskId);

    }


    // Delete Button Click

    if (event.target.closest(".task-delete")) {

        deleteTask(taskId);

    }

}


taskList.addEventListener("click", handleTaskActions);

completedTaskList.addEventListener(
    "click",
    handleTaskActions
);


// ========================================
// 24. SAVE TIMER STATE
// ========================================

function saveTimerState() {

    const timerState = {

        mode: currentMode,

        remaining: remainingTime,

        running: isRunning,

        endAt: endTime

    };


    localStorage.setItem(
        "pomoTimerState",
        JSON.stringify(timerState)
    );

}


// ========================================
// 25. RESTORE TIMER STATE
// ========================================

function restoreTimerState() {

    const savedState = JSON.parse(
        localStorage.getItem("pomoTimerState")
    );


    if (!savedState) return;


    if (!Object.hasOwn(timerModes, savedState.mode)) {
        return;
    }

    if (!Number.isFinite(savedState.remaining) ||
        savedState.remaining < 0 ||
        savedState.remaining > timerModes[savedState.mode]) {
        return;
    }


    currentMode = savedState.mode;

    totalTime = timerModes[currentMode];

    remainingTime = savedState.remaining;


    updateActiveTab();

    updateTimerDisplay();


    // Restore Running Timer

    if (savedState.running &&
        Number.isFinite(savedState.endAt)) {

        const timeLeft = Math.ceil(
            (savedState.endAt - Date.now()) / 1000
        );

        if (timeLeft > 0) {

            remainingTime = timeLeft;

            startTimer();

        } else {

            remainingTime = 0;

            completeSession();

        }

    }


    updateTimerDisplay();

}


// ========================================
// 26. INITIALIZE APPLICATION
// ========================================

function initializeApp() {

    completedSessions.textContent = sessionCount;

    updateActiveTab();

    updateTimerDisplay();

    updateStartButton();

    renderTasks();

    restoreTimerState();

}



// 27. START APPLICATION

initializeApp();