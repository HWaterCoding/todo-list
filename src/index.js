import "./styles.css";

import Task from "./task.js";
import AppManager from "./app-manager.js";
import initApp from "./ui-controller.js";




const manager = new AppManager();
initApp(manager);

window.Task = Task;
window.manager = manager;


manager.populateStorage();



//Things to do next:

//look through date-fns to see what to add/alter with time based code

//udpate all CSS to be entirely responsive so no visual glitches occur!
//finalize any CSS changes needed for stlying

//add a search option if you want


//UPGRADES FOR THE FUTURE:::::

//SEARCH BUTTON:
//Create the search button so that when its pressed it turns into an input and the user can type right there
//retrieve all tasks, and loop through them to check if any include the current string in the inputfield.
//Make sure that you check both the title and description for matches to the search input field

//SETTINGS BUTTONS:
//Create an info panel that shows the user how to operate the app in a basic way. 
//Probably need to use pictures in this pop up and treat it like a modal 
//Probably stuff this into its own module for easy implementation