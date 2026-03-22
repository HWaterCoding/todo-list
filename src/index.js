//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import TaskManager from "./task-manager.js";
import { renderController } from "./DOM-creation-modules/display-tasks.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";

renderController([]);

const manager = new TaskManager();

window.Task = Task;
window.manager = manager;

// createTaskForm();



//Ideas:
//When a new task is created, always add it to the "My tasks" project.
//Have the "My Tasks" section the default project selected when a new task is created
//When a project is selected, include it in the "My Tasks" section as well.



