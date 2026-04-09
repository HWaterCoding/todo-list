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

//NEXT: Focus on "Inbox" vs "My Tasks" design issue and make a decision.

//2) Create a filtering function for the ui-controller 
