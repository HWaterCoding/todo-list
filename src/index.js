//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import TaskManager from "./task-manager.js";

const manager = new TaskManager();

window.Task = Task;
window.manager = manager;