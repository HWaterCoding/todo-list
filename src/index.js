//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";

//On page load we will render the "My Tasks" list that's stored.
// renderController([]);

const manager = new AppManager();
manager.addProject("tasktest");

window.Task = Task;
window.manager = manager;

initApp(manager);







//To-Do next:
//1) Create a rough draft of what an added task will look like in the HTML. (needs a delete+edit button)
//2) style that task in your css
//3) Then create that task in the display-tasks module renderTaskList() function
//4) finish addProjectSidebarBtn logic in ui-controller module
//5) create a module for rendering projects on the list on the side. 






//Ideas:
//When a new task is created, always add it to the "My tasks" project.
//Have the "My Tasks" section the default project selected when a new task is created
//When a project is selected, include it in the "My Tasks" section as well.
