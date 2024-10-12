# sctech kanban

A lightweight, self-hosted Kanban board built with plain HTML, CSS, and JavaScript, with a minimal backend using Node.js and Express for task storage. No fancy graphics or unnecessary features — just a simple board to manage your tasks.

## Features

- Drag-and-drop tasks between columns: To Do, In Progress, Done
- Task Deletion: Each task has a delete button that allows you to remove it from the board and server
- No database needed: task data is stored in a simple JSON file
- Lightweight and easy to set up

## Installation

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. If not, you can download it from [here](https://nodejs.org).
- Git: You'll also need [Git](https://git-scm.com) to clone the repository.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/sctech-tr/kanban.git
   cd kanban
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   node server.js
   ```

4. Access the board: Open your browser and go to:
   ```
   http://localhost:3000
   ```

5. Congrats! You should now see the Kanban board running locally on your machine.

## Usage

- Drag and drop tasks between the columns.
- The tasks will be saved in a `tasks.json` file in the root folder of the project. This file stores the current state of the board.

## Adding Tasks

Use the task addition form to add tasks. Alternatively, update the `tasks.json` file manually to pre-load tasks.

## Customization

You can easily modify the layout or styles by editing the `index.html` and `style.css` files in the public folder.

## Adding/Editing Columns

To customize the columns on your Kanban board, you can modify the `columns.json` file. Here's an example structure:

```json
{
  "columns": [
    { "id": "todo", "name": "To Do" },
    { "id": "inprogress", "name": "In Progress" },
    { "id": "done", "name": "Done" }
  ]
}
```

You can add or remove columns by editing this file, and the changes will be reflected when you refresh the page.

## Running on Machine Startup

To run this application on startup, you can use a process manager like `pm2`.

1. Install pm2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application with pm2:
   ```bash
   pm2 start server.js --name "sctech-kanban"
   ```

3. Set pm2 to start on boot:
   ```bash
   pm2 startup
   pm2 save
   ```

Now your Kanban board will start automatically whenever your machine boots up.

## Contributing

Feel free to submit issues or pull requests to improve the project.

Happy working! 😊