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

//1) Add a "taskList" div in main to append tasks instead of directly to main
//2) put the sort feature on the right side of main
//3) put a "current Project" h1 on the left side of main to display current project on
//4) Style the project buttons correctly in the project list and add an "active" feautre to reflect which project is active
//5) Wire the "My Tasks" section properly so that it gathers all tasks and displays them properly.
//6) Make it so that if the current project is deleted, render the inbox project instead.
//7) 
