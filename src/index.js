//main module to import and initialize app
import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";
import Project from "./project.js";


//On page load we will render the "My Tasks" list that's stored.

const manager = new AppManager();
initApp(manager);


window.Task = Task;
window.manager = manager;


//will remove this, just for accessibility testing
renderController([]);
const testProject = new Project("Test Project");
manager.addProject(testProject);
renderProjectList(manager.allProjects);




//Things to do next:

//next: make the current project h1 update dynamically with selected project.

//4) Fix the <main> or <taskList> section so that it's scrollable to accomodate new task items appended.

//4) Style the project buttons correctly in the project list and add an "active" feautre to reflect which project is active
//5) Wire the "My Tasks" section properly so that it gathers all tasks and displays them properly.
//6) Make it so that if the current project is deleted, render the inbox project instead.
//7) filter through all tasks in the completed event listener to display only completed tasks.


//8)  go through all modules and slowly start fixing every single commented piece of code that needs attention
