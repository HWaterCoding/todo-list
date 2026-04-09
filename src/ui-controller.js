import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";

export default function initApp(manager){

    let currentProjectId = manager.defaultProjectID;

    function renderCurrentProject(){
        const projectToRender = manager.getProject(currentProjectId);
        const tasksToRender = projectToRender.tasks;
        renderController(tasksToRender);
    }

    function addTaskToMain(){
        const doesFormExist = document.getElementById("taskForm");
        if(doesFormExist) return;
        const form = createTaskForm(manager.allProjects, manager.defaultProjectID);
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
            renderCurrentProject();
            form.taskFormModal.remove();
        }); 
    };

    function addProjectToList(){
        const doesTaskFormExist = document.getElementById("taskFormModal");
        if(doesTaskFormExist){
            doesTaskFormExist.remove();
        }
        //add a check to not add inbox project to list!
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
    };

    const addTaskBtnSidebar = document.getElementById("addTaskBtn");
    addTaskBtnSidebar.addEventListener("click", addTaskToMain);
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("defaultAddTaskBtn")) {
            addTaskToMain();
        }
    });

    const addProjectBtnSidebar = document.getElementById("addProjectBtn");
    addProjectBtnSidebar.addEventListener("click", addProjectToList);
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("defaultAddProjectBtn")) {
            addProjectToList();
        }
    });

    //inbox project display
    const inboxBtn = document.getElementById("inboxBtn");
    inboxBtn.addEventListener("click", ()=>{
        currentProjectId = manager.defaultProjectID;
        renderCurrentProject();
    });

    //  //My Tasks main tab switching and task display
    const myTasksBtn = document.getElementById("myTasksBtn")
    myTasksBtn.addEventListener("click", ()=>{
        //create empty array
        let tasks = [];

        const projects = manager.allProjects;

        for(const project of projects){

        }
        //use allProjects to retrieve each project array

        //use a for of loop to go through each project array and extract all tasks in each project.
        
        //store every task in empty array above
       
        //append each task as it's own taskItem.

        //sort them in a specific order (probably by newest to oldest)
        
        //set currentProjectId to "all" or something 

        //My Tasks should not be an actual project, just a compiled view of every task that currently exists.
    });


    // //search tasks button (look up all tasks by title?)
    const searchBtn = document.getElementById("searchBtn")
    searchBtn.addEventListener("click", ()=>{

    });

    // //completed tasks switching and display
    const completedTasksBtn = document.getElementById("completedBtn");
    completedTasksBtn.addEventListener("click", ()=>{
        // go through all tasks similar to the My Tasks area
        // Only retrieve tasks with completed === true
        // display all tasks and slightly altar display(strikethrough or something)
    });


    // taskItem event listeners 
    const main = document.getElementById("main");
    main.addEventListener("click", (event)=>{
        const isDeleteButton = event.target.closest(".deleteTaskBtn");
        const isEditButton = event.target.closest(".editTaskBtn");
        const isCancelBtn = event.target.closest(".cancelEditBtn");
        const isSaveBtn = event.target.closest(".saveEditBtn");
        const isCompletedCheckbox = event.target.closest(".completedCheckbox");
        if(!isDeleteButton && !isEditButton && !isCancelBtn && !isSaveBtn && !isCompletedCheckbox) return;
        if(isDeleteButton){
            const task = event.target.closest(".taskItem");
            const idToDelete = task.dataset.id;
            const project = manager.getProject(currentProjectId);
            project.removeTask(idToDelete)
            renderController(project.tasks);
        }
        if(isEditButton){

            const task = event.target.closest(".taskItem");
            const doesEditExist = document.querySelector(".editTaskButtonContainer");
            if(doesEditExist) return;
                
            const title = task.querySelector(".taskItemTitle");
            title.readOnly = false;
            const description = task.querySelector(".taskItemDescription");
            description.readOnly = false;
            const dueDate = task.querySelector(".taskItemDueDate");
            dueDate.readOnly = false;
            title.focus();

            const editTaskButtonContainer = document.createElement("div");
            editTaskButtonContainer.classList.add("editTaskButtonContainer");

            const cancelEditBtn = document.createElement("button");
            cancelEditBtn.classList.add("cancelEditBtn");
            cancelEditBtn.textContent = "Cancel";

            const saveEditBtn = document.createElement("button");
            saveEditBtn.classList.add("saveEditBtn");
            saveEditBtn.textContent = "Save";
            
            editTaskButtonContainer.append(cancelEditBtn, saveEditBtn);
            const taskItemButtons = document.querySelector(".taskItemButtons");
            taskItemButtons.append(editTaskButtonContainer);
        }
        if(isCancelBtn){
            renderCurrentProject();
        };
        if(isSaveBtn){
            const task = event.target.closest(".taskItem");

            const title = task.querySelector(".taskItemTitle");
            title.readOnly = true;
            const description = task.querySelector(".taskItemDescription");
            description.readOnly = true;
            const dueDate = task.querySelector(".taskItemDueDate");
            dueDate.readOnly = true;

            const idToEdit = task.dataset.id;
            const taskToEdit = manager.getProject(currentProjectId).getTask(idToEdit);

            taskToEdit.title = title.value;
            taskToEdit.description = description.value;
            taskToEdit.dueDate = dueDate.value;

            renderCurrentProject();
        };
        if(isCompletedCheckbox){
            const task = event.target.closest(".taskItem");
            const taskID = task.dataset.id;
            const taskToComplete = manager.getProject(currentProjectId).getTask(taskID);
            const isChecked = event.target.checked;
            if(!isChecked){
                taskToComplete.completed = false;
            } else{
                taskToComplete.completed = true;
            }
            renderCurrentProject();
        }
    })

    //project switching event listeners
    const projectList = document.getElementById("projectList");
    projectList.addEventListener("click", (event)=>{
        const isProject = event.target.closest(".projectButton")
        const isRemoveBtn = event.target.closest(".removeProjectBtn");
        if(!isProject && !isRemoveBtn) return;
        if(isProject){
            main.innerHTML = "";
            currentProjectId = isProject.dataset.id;
            renderCurrentProject();
        }
        if(isRemoveBtn){
            const project = event.target.closest(".projectItem");
            const idToDelete = project.dataset.id;
            //need to render inbox section as well if this is the current project selected
            // if(idToDelete === currentProjectId){
            //     renderController(inbox.tasks);
            // }
            manager.removeProject(idToDelete);
            renderProjectList(manager.allProjects);
            // need to reset the currentProjectId to the default inbox section then re-render.
            currentProjectId = manager.defaultProjectID;
            renderCurrentProject();
            //what happens to this projects tasks??
        }
    })
}