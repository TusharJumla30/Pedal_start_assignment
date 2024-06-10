
document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const taskModal = new bootstrap.Modal(document.getElementById('task-modal'), {
        keyboard: false
    });
    const taskForm = document.getElementById('task-form');
    const modalTitle = document.getElementById('modal-title');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDueDateInput = document.getElementById('task-due-date');

    // Function to display tasks
    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task', 'card', 'mb-3');
            taskElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    // Fetch tasks from the server
    async function fetchTasks() {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        displayTasks(tasks);
    }

    // Add task event listener
    addTaskButton.addEventListener('click', () => {
        modalTitle.textContent = 'Add Task';
        taskIdInput.value = '';
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';
        taskModal.show();
    });

    // Submit task form
    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskData = {
            title: taskTitleInput.value,
            description: taskDescriptionInput.value,
            dueDate: taskDueDateInput.value
        };
        const taskId = taskIdInput.value;
        if (taskId) {
            // Update existing task
            await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        } else {
            // Create new task
            await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        }
        taskModal.hide();
        fetchTasks();
    });

    // Edit task function
    window.editTask = async function(id) {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const task = await response.json();
        modalTitle.textContent = 'Edit Task';
        taskIdInput.value = task.id;
        taskTitleInput.value = task.title;
        taskDescriptionInput.value = task.description;
        taskDueDateInput.value = task.dueDate;
        taskModal.show();
    };

    // Delete task function
    window.deleteTask = async function(id) {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    };

    // Fetch and display tasks on page load
    fetchTasks();
});
