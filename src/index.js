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


manager.populateStorage();



//Things to do next:

//look through date-fns to see what to add/alter with time based code

//udpate all CSS to be entirely responsive so no visual glitches occur!
//finalize any CSS changes needed for stlying

//add a night mode feature if you want
//add a search option if you want

//one last comb through of project to look for unfinished comments/code/bugs, etc

//there is one issue with the project names where if a project name is too long, it makes the button push the sidebar
//and take up way more space than it should. The same thing happens with the project label, which then pushes over
//the taskArea and completely destroys layout. We need to implement some sort of wrapping feature or character limit.
