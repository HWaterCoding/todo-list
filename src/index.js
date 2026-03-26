//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";

renderController([]);

const manager = new AppManager();
manager.addProject("tasktest");

window.Task = Task;
window.manager = manager;

initApp(manager);



//Ideas:
//When a new task is created, always add it to the "My tasks" project.
//Have the "My Tasks" section the default project selected when a new task is created
//When a project is selected, include it in the "My Tasks" section as well.
