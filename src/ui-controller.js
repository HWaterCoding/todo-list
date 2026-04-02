import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";

// This module will bind and control UI 
export default function initApp(manager){
    //add event listeners for addTaskBtn and addProjectBtn here

    const addTaskBtnSidebar = document.getElementById("addTaskBtn");
    addTaskBtnSidebar.addEventListener("click", ()=>{
        const doesFormExist = document.getElementById("taskForm");
        if(doesFormExist) return;
        const form = createTaskForm(manager.allProjects);
        form.taskForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const task = new Task(
                form.taskForm.taskTitle.value,
                form.taskForm.taskDescription.value,
                form.taskForm.dueDate.value,
                form.taskForm.prioritySelector.value,
            );
            let projectID = form.taskForm.projectSelector.value;
            manager.addTaskToProject(projectID, task);
            //also make sure every task by default added to the "My Tasks" project as well
            form.taskFormModal.remove();
        }); 
    });

    const addProjectBtnSidebar = document.getElementById("addProjectBtn");
    addProjectBtnSidebar.addEventListener("click", ()=>{
        const form = createProjectForm();
        form.projectForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const project = new Project(
                form.projectForm.projectTitle.value
            );
            manager.addProject(project.name);
            form.projectFormOverlay.remove();
            console.log(manager.allProjects)
        });
    });
}