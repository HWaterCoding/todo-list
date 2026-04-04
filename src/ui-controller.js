import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";

export default function initApp(manager){

    let currentProjectId = null;

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
            // const projectToRender = manager.getProject(projectID);
            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            // if(tasksToRender === undefined){
                //renderController("My Tasks");
            // }
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


    // editTaskBtn event listeners
    const main = document.getElementById("main");
    main.addEventListener("click", (event)=>{
        const isDeleteButton = event.target.closest(".deleteTaskBtn");
        const isEditButton = event.target.closest(".editTaskBtn");
        if(!isDeleteButton && !isEditButton) return;
        if(isDeleteButton){
            const task = event.target.closest(".taskItem");
            const idToDelete = task.dataset.id;
            const project = manager.getProject(currentProjectId);
            project.removeTask(idToDelete)
            renderController(project.tasks);
        }
        if(isEditButton){
            // switch inputs on task items from readonly to editable
            //store all new inputs.
            //rerender
        }
    })


    //project switching event listeners
    const projectList = document.getElementById("projectList");
    projectList.addEventListener("click", (event)=>{
        main.innerHTML = "";
        const isProject = event.target.closest(".projectButton")
        if(!isProject) return;
        currentProjectId = isProject.dataset.id;
        const projectToRender = manager.getProject(currentProjectId);
        const tasksToRender = projectToRender.tasks;
        renderController(tasksToRender);
    })
}