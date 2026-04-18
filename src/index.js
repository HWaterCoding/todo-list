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

//one last comb through of project to look for unfinished comments/code/bugs, etc\


//UPGRADES FOR THE FUTURE:::::

//SEARCH BUTTON:
//Create the search button so that when its pressed it turns into an input and the user can type right there
//retrieve all tasks, and loop through them to check if any include the current string in the inputfield.
//Make sure that you check both the title and description for matches to the search input field

//NIGHT MODE:
//change --root color values with a .darkmode class on click then re back when clicked again
//add event listener to UI that adds that class to every element we want to change
//Incorporate the second icon for the night-mode switch and show/hide it on click like stopwatch toggle btn


//SETTINGS BUTTONS:
//Create an info panel that shows the user how to operate the app in a basic way. 
//Probably need to use pictures in this pop up and treat it like a modal 
//Probably stuff this into its own module for easy implementation