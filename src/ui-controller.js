import TaskManager from "./task-manager.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";

// This module will bind and control UI 
export default function initApp(appManager){
    //add event listeners for addTaskBtn and addProjectBtn here
    const addTaskBtnSidebar = document.getElementById("addTaskBtn");
    addTaskBtnSidebar.addEventListener("click", ()=>{
        createTaskForm();
    });

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const task = new Task(
            this.title.value,
            this.description.value,
            this.dueDate.value,
            this.priority.value
        );

        addTask(task);
    });

}