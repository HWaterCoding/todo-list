import createTaskForm from "./DOM-creation-modules/task-form.js";

// This module will bind and control UI 
export default function initApp(){
    //add event listeners for addTaskBtn and addProjectBtn here
    const addTaskBtnSidebar = document.getElementById("addTaskBtn");
    addTaskBtnSidebar.addEventListener("click", ()=>{
        createTaskForm();
    });
}