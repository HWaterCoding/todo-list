import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";

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
            //render tasks created instantly under "My Tasks".
            const projectToRender = manager.getProject(projectID);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
            form.taskFormModal.remove();
        }); 
    });

    //for the above listener:
    //1) add task then render the project its being added to 
    //2) track the currentProject being viewed, let sidebar project buttons change it's value.
    //3) render always based on currentProject value

    const addProjectBtnSidebar = document.getElementById("addProjectBtn");
    addProjectBtnSidebar.addEventListener("click", ()=>{
        const form = createProjectForm();
        form.projectForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const project = new Project(
                form.projectForm.projectTitle.value
            );
            manager.addProject(project);
            renderProjectList(manager.allProjects);
            form.projectFormOverlay.remove();
        });
    });
}