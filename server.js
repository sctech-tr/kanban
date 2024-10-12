const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
  res.json(tasks);
});

app.get('/columns', (req, res) => {
  const columns = JSON.parse(fs.readFileSync('columns.json', 'utf8'));
  res.json(columns);
});

// Handle POST request for adding new tasks
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  
  // Read existing tasks
  const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
  
  // Add the new task
  tasks.push(newTask);
  
  // Save updated tasks to tasks.json
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  res.sendStatus(200);
});

// Handle DELETE request for deleting tasks
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  // Read existing tasks
  const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));

  // Remove task from tasks
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  
  // Save updated tasks to tasks.json
  fs.writeFileSync('tasks.json', JSON.stringify(updatedTasks, null, 2));
  res.sendStatus(200);
});

app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const newColumn = req.body.column;
  
  // Read existing tasks
  const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
  
  // Find and update the task
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.column = newColumn;
    
    // Save updated tasks to tasks.json
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.sendStatus(200);
  } else {
    res.status(404).send('Task not found');
  }
});

app.use(express.static('public'));

app.listen(3000, () => console.log('Kanban board running on http://localhost:3000'));