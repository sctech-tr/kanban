// Fetch tasks from the server
function fetchTasks() {
  fetch('/tasks')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(tasks => {
      tasks.forEach(task => addTaskToColumn(task));
    })
    .catch(error => console.error('Error loading tasks:', error));
}

// Fetch columns from the server
fetch('/columns')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const board = document.querySelector('.board');
    // Clear the board first, just in case
    board.innerHTML = '';
    // Dynamically create columns from the JSON
    data.columns.forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.classList.add('column');
      columnDiv.id = column.id;
      columnDiv.innerHTML = `<h2>${column.name}</h2>`;
      board.appendChild(columnDiv);
    });
    // Initialize drag-and-drop
    initializeDragAndDrop();
    // Fetch tasks after columns are created
    fetchTasks();
  })
  .catch(error => console.error('Error loading columns:', error));

// Handle task addition
document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTask = {
    id: Date.now(), // Unique ID for the task
    content: taskInput.value,
    column: 'todo' // Default column for new tasks
  };
  // Update the tasks on the server
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  }).then(response => {
    if (response.ok) {
      // Add task to the UI
      addTaskToColumn(newTask);
      taskInput.value = ''; // Clear the input
    } else {
      console.error('Error adding task:', response.statusText);
    }
  });
});

// Function to add task to the appropriate column
function addTaskToColumn(task) {
  const column = document.getElementById(task.column);
  const taskDiv = document.createElement('div');
  taskDiv.id = `task-${task.id}`;
  taskDiv.classList.add('task');
  taskDiv.draggable = true;
  taskDiv.innerHTML = `
    ${task.content}
    <button class="delete-task" data-id="${task.id}">Delete</button>
  `;
  column.appendChild(taskDiv);
  // Attach drag-and-drop events
  taskDiv.addEventListener('dragstart', dragStart);
  taskDiv.addEventListener('dragend', dragEnd);
  // Attach delete button event
  taskDiv.querySelector('.delete-task').addEventListener('click', deleteTask);
}

// Function to delete task
function deleteTask(e) {
  const taskId = e.target.getAttribute('data-id');
  // Remove task from UI
  const taskDiv = document.getElementById(`task-${taskId}`);
  taskDiv.remove();
  // Remove task from server
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      console.error('Error deleting task:', response.statusText);
    }
  });
}

// Drag and drop functions
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const task = document.getElementById(id);
  
  // Check if the drop target is a column
  const column = e.target.closest('.column');
  if (column && task) {
    column.appendChild(task);
    
    // Update the task's column on the server
    const taskId = task.id.replace('task-', '');
    const newColumn = column.id;
    updateTaskColumn(taskId, newColumn);
  }
}

// Function to update task's column on the server
function updateTaskColumn(taskId, newColumn) {
  fetch(`/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ column: newColumn })
  }).then(response => {
    if (!response.ok) {
      console.error('Error updating task column:', response.statusText);
    }
  });
}

// Initialize drag-and-drop
function initializeDragAndDrop() {
  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
  });
}