document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.closest('button').classList.contains('delete')) {
            const li = event.target.closest('li');
            deleteTask(li);
        } else if (event.target.closest('button').classList.contains('complete')) {
            const li = event.target.closest('li');
            toggleTaskCompletion(li);
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            renderTask(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({ 
                text: li.querySelector('.taskText').textContent.trim(), 
                completed: li.classList.contains('completed') 
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(text, completed = false) {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';
        
        const taskText = document.createElement('span');
        taskText.className = 'taskText';
        taskText.textContent = text;

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.innerHTML = '<i class="bi bi-check"></i>';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = '<i class="bi bi-backspace"></i>';

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function addTask(text) {
        renderTask(text);
        saveTasks();
    }

    function deleteTask(li) {
        taskList.removeChild(li);
        saveTasks();
    }

    function toggleTaskCompletion(li) {
        li.classList.toggle('completed');
        saveTasks();
    }
});