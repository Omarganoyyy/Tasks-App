# Tasks App

A beginner-friendly REST API for creating and managing tasks. It uses Express for HTTP routes and MongoDB through Mongoose for task storage.

## Features

- Create a task with a title
- List all tasks
- Get one task by its MongoDB ID
- Mark a task as completed or not completed
- Delete a task
- Store task creation and update timestamps

## Tech stack

- JavaScript (ES modules)
- Node.js
- Express 5
- Mongoose 9
- MongoDB
- npm

## Prerequisites

- Node.js 20.19.0 or later (Mongoose 9 requirement)
- npm (included with Node.js)
- A running MongoDB server

## Installation and setup

1. Clone the repository and open its folder:

   ```sh
   git clone <your-repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start MongoDB locally. By default, the app connects to `mongodb://localhost:27017/TaskApp`.

4. Start the API as described in [How to run](#how-to-run).

## Configuration / environment variables

The application currently does **not** read environment variables. The settings below document the values currently hardcoded in the source; `.env.example` is a reference only and is not loaded by the app.

| Name | Description | Example value |
|---|---|---|
| `PORT` | HTTP port (currently hardcoded in `src/app.controller.js`) | `3000` |
| `MONGODB_URI` | MongoDB connection URL (currently hardcoded in `src/DB/connect.db.js`) | `mongodb://localhost:27017/TaskApp` |

Do not put real passwords or production credentials in a public repository. If you later switch the app to load these values from environment variables, keep actual `.env` files private.

## How to run

Development mode (restarts when files change):

```sh
npm run dev
```

Run without watch mode:

```sh
node ./src/index.js
```

There is no separate production script or test script, and no tests are included in the project yet.

## Usage

The router is mounted at `/tasks`. The API’s current route paths are listed below; they are not the conventional `POST /tasks`, `GET /tasks`, or `GET /tasks/:id` paths.

### Create a task

`POST /tasks/create-task`

Request body:

```json
{
  "title": "Learn Express"
}
```

Success (`201 Created`):

```json
{
  "message": "Task Added"
}
```

If a task with the same title is found, the API responds with `409 Conflict`:

```json
{
  "message": "Task Already Exists"
}
```

Example:

```sh
curl -X POST http://localhost:3000/tasks/create-task -H "Content-Type: application/json" -d "{\"title\":\"Learn Express\"}"
```

### List tasks

`GET /tasks/view-tasks`

Success (`200 OK`) returns an array of task documents. If there are no tasks, it returns:

```json
{
  "message": "No Tasks Yet"
}
```

Example:

```sh
curl http://localhost:3000/tasks/view-tasks
```

### Get one task

`GET /tasks/view-tasks/:taskId`

Success (`200 OK`):

```json
{
  "success": true,
  "task": {
    "_id": "<MongoDB-generated-id>",
    "title": "Learn Express",
    "completed": false,
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
}
```

If the ID is valid but no task matches, the API responds with `404 Not Found` and `{"message":"No Task Found"}`.

Example:

```sh
curl http://localhost:3000/tasks/view-tasks/<taskId>
```

### Update task completion

`PATCH /tasks/status/:taskId`

Request body:

```json
{
  "completed": true
}
```

Success (`200 OK`) returns `{"message":"Done","task":<updated-task>}`. A missing task returns `404 Not Found` with `{"message":"Task Not Found"}`. If `completed` is not a boolean, it returns `400 Bad Request` with `{"message":"Completed must be true or false"}`.

Example:

```sh
curl -X PATCH http://localhost:3000/tasks/status/<taskId> -H "Content-Type: application/json" -d "{\"completed\":true}"
```

### Delete a task

`DELETE /tasks/:taskId`

Success (`200 OK`) returns a message and the deleted task:

```json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "<MongoDB-generated-id>",
    "title": "Learn Express",
    "completed": true
  }
}
```

If no task matches, the API responds with `404 Not Found` and `{"message":"Task Not Found"}`.

Example:

```sh
curl -X DELETE http://localhost:3000/tasks/<taskId>
```

Other database or unexpected errors are passed to Express's default error handler; a consistent custom error response is not implemented.

## Project structure

```text
.
├── src/
│   ├── app.controller.js       # Express setup, database startup, and router mounting
│   ├── index.js                # Application entry point
│   ├── DB/
│   │   ├── connect.db.js       # MongoDB connection
│   │   └── models/
│   │       └── task.model.js   # Mongoose task schema and model
│   └── tasks/
│       ├── task.controller.js  # Task route definitions
│       └── task.service.js     # HTTP handlers and task database operations
├── .env.example                # Reference for the currently hardcoded settings
├── .gitignore                  # Files not intended for Git
├── LICENSE                     # MIT license template
├── package.json                # npm metadata, dependencies, and scripts
└── package-lock.json           # Locked npm dependency versions
```

## What I learned / future improvements

- Practice Express routing and asynchronous Mongoose queries.
- Add input validation and consistent error handling.
- Read the port and MongoDB URI from environment variables.
- Add automated tests and a production start script.
- Consider authentication and per-user task access before exposing the API publicly.
- Check whether the declared `node-modules` dependency is needed; it is not referenced in the application source.

## License

This project is released under the MIT License. See [LICENSE](./LICENSE).
