import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";

// This module will bind and control UI 
export default function initApp(manager){
    //add event listeners for addTaskBtn and addProjectBtn here

    const addTaskBtnSidebar = document.getElementById("addTaskBtn");
    addTaskBtnSidebar.addEventListener("click", ()=>{
        const taskForm = createTaskForm(manager.allProjects);
        taskForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const task = new Task(
                taskForm.taskTitle.value,
                taskForm.taskDescription.value,
                taskForm.dueDate.value,
                taskForm.prioritySelector.value,
            );
            let projectID = taskForm.projectSelector.value;
            manager.addTaskToProject(projectID, task);
            manager.addTaskToProject(projectID = "My Tasks", task)
            //also make sure its by default added to the "My Tasks" project as well
        }); 
    });

    const addProjectBtnSidebar = document.getElementById("addProjectBtn");
    addProjectBtnSidebar.addEventListener("click", ()=>{
        const projectForm = createProjectForm();
        projectForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const project = new Project(
                projectForm.projectTitle.value
            );
        });
    });
}