//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";
import Project from "./project.js";


//On page load we will render the "My Tasks" list that's stored.

const manager = new AppManager();

window.Task = Task;
window.manager = manager;

initApp(manager);

//will remove this, just for accessibility testing
renderController([]);
const testProject = new Project("Test Project");
manager.addProject(testProject);
renderProjectList(manager.allProjects);






//Ideas:
//When a new task is created, always add it to the "My tasks" project.
//Have the "My Tasks" section the default project selected when a new task is created
//When a project is selected, include it in the "My Tasks" section as well.
