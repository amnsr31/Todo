let tasks = [];
let editIndex = -1; // Tracks which task is being edited

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        if (editIndex !== -1) {
            // We're editing an existing task
            tasks[editIndex].text = text;
            editIndex = -1; // Reset edit mode
        } else {
            // We're adding a new task
            tasks.push({ text: text, completed: false });
        }
        taskInput.value = ''; // Clear input
        updateTaskList();
        saveTasks()
    }
};

const updateTaskList = () => {
    const taskListEl = document.getElementById('taskList');
    taskListEl.innerHTML = '';

    tasks.forEach((task, idx) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${idx})" />
                    <img src="./img/bin.png" onclick="deleteTask(${idx})" />
                </div>
            </div>
        `;

        // Checkbox handler
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskCompleted(idx));

        taskListEl.appendChild(listItem);
    });
};

const editTask = (idx) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[idx].text;
    editIndex = idx; // Set edit mode
    saveTasks()
};

const deleteTask = (idx) => {
    tasks.splice(idx, 1);
    updateTaskList();
    saveTasks()
};

const toggleTaskCompleted = (idx) => {
    tasks[idx].completed = !tasks[idx].completed;
    updateTaskList();
    saveTasks()
};

document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
