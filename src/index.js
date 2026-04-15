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




//Things to do next:


//Add localStorage!

//udpate all CSS to be entirely responsive so no visual glitches occur!
//finalize any CSS changes needed for stlying

//add a night mode feature if you want
//add a search option if you want

//one last comb through of project to look for unfinished comments/code/bugs, etc