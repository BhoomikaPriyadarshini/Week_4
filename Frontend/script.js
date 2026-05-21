const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const suggestionBox = document.getElementById("suggestionBox");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeText = document.getElementById("welcomeText");
const editModal = document.getElementById("editModal");
const editTaskNameInput = document.getElementById("editTaskName");
const editStatusInput = document.getElementById("editStatus");
const editDateInput = document.getElementById("editDate");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let currentEditTaskId = null;


const API_URL = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");
const userName = localStorage.getItem("userName");

if (!token) {
    window.location.href = "login.html";
}

if (userName) {
    welcomeText.textContent = "Welcome, " + userName + ". Add, view and manage your tasks.";
}

// Simple AI suggestion logic
taskNameInput.addEventListener("input", function() {
    const value = taskNameInput.value.toLowerCase().trim();

    if (value.includes("study")) {
        suggestionBox.textContent = "Suggestion: Study for 2 hours";
    } else if (value.includes("exercise") || value.includes("workout")) {
        suggestionBox.textContent = "Suggestion: Exercise for 30 minutes";
    } else if (value.includes("project")) {
        suggestionBox.textContent = "Suggestion: Work on project for 1 hour";
    } else if (value.includes("read")) {
        suggestionBox.textContent = "Suggestion: Read 10 pages today";
    } else if (value.includes("work")) {
        suggestionBox.textContent = "Suggestion: Focus on work for 1 hour";
    } else if (value.includes("sleep")) {
        suggestionBox.textContent = "Suggestion: Sleep by 10 PM tonight";
    } else if (value.includes("task")) {
        suggestionBox.textContent = "Suggestion: Break this task into smaller steps";
    } else if (value.includes("meeting")) {
        suggestionBox.textContent = "Suggestion: Prepare meeting notes before 5 PM";
    } else if (value.includes("write")) {
        suggestionBox.textContent = "Suggestion: Write for 45 minutes without distraction";
    } else {
        suggestionBox.textContent = "";
    }
});

// Logout
logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    window.location.href = "login.html";
});

// Get tasks from backend
async function getTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<div class='empty-message'>No tasks added yet.</div>";
            return;
        }

        tasks.forEach(function(task) {
            let statusClass = "";

            if (task.status === "Pending") {
                statusClass = "status-pending";
            } else if (task.status === "In Progress") {
                statusClass = "status-progress";
            } else if (task.status === "Completed") {
                statusClass = "status-completed";
            }

            const taskCard = document.createElement("div");
taskCard.className = "task-card";

if (task.status === "Completed") {
    taskCard.classList.add("completed-task");
}

taskCard.innerHTML = `
    <h3>${task.taskName}</h3>
    <p>Date: ${task.date}</p>
    <span class="status ${statusClass}">${task.status}</span>
    <div class="task-actions">
        <button class="edit-btn" onclick="editTask('${task._id}', '${task.taskName}', '${task.status}', '${task.date}')">Edit</button>
        ${
            task.status !== "Completed"
                ? `<button class="complete-btn" onclick="markComplete('${task._id}')">Mark Complete</button>`
                : ""
        }
        <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
    </div>
`;


            taskList.appendChild(taskCard);
        });
    } catch (error) {
        console.log("Error getting tasks:", error);
    }
}

// Add task to backend
taskForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;

    const year = Number(date.split("-")[0]);
    const currentYear = new Date().getFullYear();

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    if (year < currentYear || year > currentYear + 5) {
        alert("Please enter a valid year between " + currentYear + " and " + (currentYear + 5) + ".");
        return;
    }

    const newTask = {
        taskName: taskName,
        status: status,
        date: date
    };

    try {
        await fetch(API_URL + "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        });

        taskForm.reset();
        suggestionBox.textContent = "";
        getTasks();
    } catch (error) {
        console.log("Error adding task:", error);
    }
});

// Edit task
async function editTask(id, oldName, oldStatus, oldDate) {
    currentEditTaskId = id;

    editTaskNameInput.value = oldName;
    editStatusInput.value = oldStatus;
    editDateInput.value = oldDate;

    editModal.style.display = "flex";
}

cancelEditBtn.addEventListener("click", function() {
    editModal.style.display = "none";
    currentEditTaskId = null;
});

saveEditBtn.addEventListener("click", async function() {
    const newName = editTaskNameInput.value;
    const newStatus = editStatusInput.value;
    const newDate = editDateInput.value;

    if (!newName || !newStatus || !newDate) {
        alert("Please fill all fields.");
        return;
    }

    const year = Number(newDate.split("-")[0]);
    const currentYear = new Date().getFullYear();

    if (year < currentYear || year > currentYear + 5) {
        alert("Please enter a valid year between " + currentYear + " and " + (currentYear + 5) + ".");
        return;
    }

    try {
        await fetch(API_URL + "/edit/" + currentEditTaskId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskName: newName,
                status: newStatus,
                date: newDate
            })
        });

        editModal.style.display = "none";
        currentEditTaskId = null;
        getTasks();
    } catch (error) {
        console.log("Error editing task:", error);
    }
});



// Mark task as complete
async function markComplete(id) {
    try {
        await fetch(API_URL + "/complete/" + id, {
            method: "PUT"
        });

        getTasks();
    } catch (error) {
        console.log("Error marking task as complete:", error);
    }
}

// Delete task from backend
async function deleteTask(id) {
    try {
        await fetch(API_URL + "/delete/" + id, {
            method: "DELETE"
        });

        getTasks();
    } catch (error) {
        console.log("Error deleting task:", error);
    }
}

getTasks();
