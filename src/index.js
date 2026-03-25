//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController } from "./DOM-creation-modules/display-tasks.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import initApp from "./ui-controller.js";

// renderController([]);

const manager = new AppManager();
manager.addProject("tasktest");

window.Task = Task;
window.manager = manager;

// createTaskForm(manager.allProjects);

initApp(manager);



//Ideas:
//When a new task is created, always add it to the "My tasks" project.
//Have the "My Tasks" section the default project selected when a new task is created
//When a project is selected, include it in the "My Tasks" section as well.


//Need to add a small form creation module for when making a new project
