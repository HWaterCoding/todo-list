//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import TaskManager from "./task-manager.js";
import { renderController } from "./DOM-creation-modules/display-tasks.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";

// renderController([]);

const manager = new TaskManager();

window.Task = Task;
window.manager = manager;

createTaskForm();