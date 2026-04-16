import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";
import initApp from "./ui-controller.js";
import Project from "./project.js";



//write localStorage function here to check your storage object and retrieve them


const manager = new AppManager();
initApp(manager);

window.Task = Task;
window.manager = manager;


manager.populateStorage();
console.log(localStorage);

//Things to do next:


//Add localStorage!
//look through date-fns to see what to add/alter with time based code

//udpate all CSS to be entirely responsive so no visual glitches occur!
//finalize any CSS changes needed for stlying

//add a night mode feature if you want
//add a search option if you want

//one last comb through of project to look for unfinished comments/code/bugs, etc




//localStorage:
// First, create a function that will probably live in the ui-controller (maybe app-manager), that stores projects
// and tasks into the localStorage storage object. 

//then, create a second function that will look for any stored keys/values in the storage object and if found,
//adds them back into the projects and tasks [] arrays? Probably has to be both on the app-manager and project object?

//keep in mind you have to use JSON.stringify() to convert whatever you store into strings.

//also keep in mind that you can check if storage is working in devTools (application tab)

//IMPORTANT HERE
//(i think probably create the functions on the app-manager, and call them on the event listener when creating
//project/task objects)

//Then we have to handle removeItem() when a task or project is deleted, as well.s