document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const taskContainer = document.querySelector(".taskContainer");
const addTaskButton = document.getElementById("addTask");
const dateNoteCon = document.getElementById("dateNoteCon");
const dateNoteText = document.getElementById("dateNote");
const saveNoteButton = document.getElementById("saveNote");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasks() {
    taskContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        createTaskElement(task.title, task.description, index);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(title, description, index) {
    if (document.querySelector(`[data-index="${index}"]`)) return;

    const task = document.createElement("div");
    task.classList.add("task");
    task.dataset.index = index;

    const left = document.createElement("div");
    left.classList.add("left");

    const check = document.createElement("div");
    check.classList.add("check");
    check.addEventListener("click", () => deleteTask(index));
    
    const taskName = document.createElement("h2");
    taskName.textContent = title;
    taskName.addEventListener("click", () => openTaskDetails(index));

    left.appendChild(check);
    left.appendChild(taskName);

    const right = document.createElement("div");
    right.classList.add("right");

    const edit = document.createElement("div");
    edit.classList.add("edit");
    edit.addEventListener("click", () => editTask(index));

    right.appendChild(edit);

    task.appendChild(left);
    task.appendChild(right);
    taskContainer.appendChild(task);
}

function newTask() {
    console.log("Add Task clicked")

    const defaultTitle = "New Task"
    const newTask = { title: defaultTitle, description: "" }
    tasks.push(newTask)
    saveTasks()
    createTaskElement(defaultTitle, "", tasks.length - 1)
}

if (!addTaskButton.dataset.listenerAttached) {
    addTaskButton.addEventListener("click", newTask)
    addTaskButton.dataset.listenerAttached = "true"
}

function editTask(index) {
    const newTitle = prompt("Edit Task Title:", tasks[index].title)
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].title = newTitle
        saveTasks()
        loadTasks()
    }
}

function openTaskDetails(index) {
    dateNoteCon.style.display = "flex";
    dateNoteText.value = tasks[index].description || "";
    document.querySelector("#dateNoteCon h2").textContent = tasks[index].title;

    saveNoteButton.onclick = () => {
        tasks[index].description = dateNoteText.value;
        saveTasks();
        dateNoteCon.style.display = "none";
    };
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}



// Fixing the calendar navigation logic
const header = document.querySelector(".calendar h3")
const dates = document.querySelector(".dates")
const navs = document.querySelectorAll("#prev, #next")

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

function setEvent(e) {
    dateNoteKey = e.textContent + " " + months[month] + " " + year
    dateSelected = e.textContent
    console.log("date selected "+ dateNoteKey)
    localStorage.setItem('dateNoteKey', dateSelected)
    const dateNoteTitle = document.querySelector('#dateNoteCon h2')
    dateNoteTitle.innerHTML = dateSelected
    dateNoteCon.style.display = "flex"

    document.getElementById('dateNote').value = localStorage.getItem(dateNoteKey)

    document.getElementById("saveNote").addEventListener("click", function () {
        let dateNote = document.getElementById('dateNote').value
        localStorage.setItem(dateNoteKey, dateNote)
        dateNoteCon.style.display = "none"
        console.log("funket")
    }, false)

}

let date = new Date()
let month = date.getMonth()
let year = date.getFullYear()

function renderCalendar() {
    const start = new Date(year, month, 1).getDay()
    const endDate = new Date(year, month + 1, 0).getDate()
    const end = new Date(year, month, endDate).getDay()
    const endDatePrev = new Date(year, month, 0).getDate()

    let datesHtml = ""
    for (let i = start; i > 0; i--) {
        datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`
    }

    for (let i = 1; i <= endDate; i++) {
        let className = "";
        if (i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            className = ' class="today"'
        }
        datesHtml += `<li${className} onClick="setEvent(this)">${i}</li>`
    }
    for (let i = end; i < 6; i++) {
        datesHtml += `<li class="inactive">${i - end + 1}</li>`
    }

    dates.innerHTML = datesHtml;
    header.textContent = `${months[month]} ${year}`
}

navs.forEach(nav => {
    nav.addEventListener("click", e => {
        const btnId = e.target.id

        if (btnId === "prev" && month === 0) {
            year--
            month = 11
        } else if (btnId === "next" && month === 11) {
            year++
            month = 0
        } else {
            month = btnId === "next" ? month + 1 : month - 1
        }

        date = new Date(year, month, new Date().getDate())
        year = date.getFullYear()
        month = date.getMonth()

        renderCalendar()
    })
})

renderCalendar();

document.getElementById("save").addEventListener("click", function () {
    let notes = document.getElementById("notes").value
    localStorage.setItem("notes", notes)
}, false)

window.onload = function () {
    document.getElementById("notes").value = localStorage.getItem("notes")
}
