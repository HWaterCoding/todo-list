import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";

export default function initApp(manager){

    //this needs to change from null to the id for inbox section
    let currentProjectId = "inbox";

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
            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
            form.taskFormModal.remove();
        }); 
    });

    //inbox project display
    const inboxBtn = document.getElementById("inboxBtn");
    inboxBtn.addEventListener("click", ()=>{

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

            //need to prevent duplication of editTaskButtonContainer

            const task = event.target.closest(".taskItem");
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

            // task.append(editTaskButtonContainer);

            //add/remove more styles with classlist.add() here to change the edit view slighty to be more defined
        }
        if(isCancelBtn){
            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
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

            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
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
            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
            //when we re-render we now how to filter out all completed=true tasks
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
            const projectToRender = manager.getProject(currentProjectId);
            const tasksToRender = projectToRender.tasks;
            renderController(tasksToRender);
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
            //what happens to this projects tasks??
        }
    })
}