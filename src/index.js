import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";
import Project from "./project.js";


const manager = new AppManager();
initApp(manager);

window.Task = Task;
window.manager = manager;


//will remove this, just for accessibility testing
const testProject = new Project("Test Project");
manager.addProject(testProject);
renderProjectList(manager.allProjects);

for(let i = 0; i < 20; i++){
    const task = new Task("whatever");
    manager.addTaskToProject(testProject.id, task);
}

renderController(testProject);




//Things to do next:

//When a user selects a priority, change the border of the taskItem as well as the checkbox color to the theme
//Add priority selector element to the edited task as well. it disappears.




//THERE'S A BUG WHEN CLICKING EDITTASK BUTTON IT APPENDS TO WRONG TASK??
//THERE'S ALSO A BUG WITH INPUT FIELDS ON TASKITEMS BEING WAY TOO SMALL???






//REMOVE "INBOX" FROM THE PROJECTLIST ON THE SIDE SO THAT IT CANNOT BE DELETED!

//4) Style the project buttons correctly in the project list and add an "active" feautre to reflect which project is active
//6) Make it so that if the current project is deleted, render the inbox project instead.

//add the sorting function and call them in the ui-controller?

//8)  go through all modules and slowly start fixing every single commented piece of code that needs attention

//Add localStorage!
