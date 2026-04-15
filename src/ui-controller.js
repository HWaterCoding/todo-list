import createProjectForm from "./DOM-creation-modules/project-form.js";
import createTaskForm from "./DOM-creation-modules/task-form.js";
import Task from "./task.js";
import Project from "./project.js";
import { renderController, renderProjectList } from "./DOM-creation-modules/display-tasks.js";

export default function initApp(manager){

    //default load + stored project ID + view at all times
    let currentView = "project"; 
    let currentProjectId = manager.defaultProjectID;
    renderCurrentProject();
    renderProjectLabel();
    
    //project label updating
    function renderProjectLabel(){
        const project = manager.getProject(currentProjectId);
        const currentProjectLabel = document.getElementById("currentProjectLabel");
        currentProjectLabel.textContent = project.name;
    }

    //general rendering function
    function renderCurrentProject(){
        const projectToRender = manager.getProject(currentProjectId);
        const tasksToRender = projectToRender.tasks;
        renderProjectList(manager.allProjects, manager.defaultProjectID, currentProjectId, currentView);
        renderController(tasksToRender, manager.allProjects, manager.defaultProjectID);
    }

    // function to create new tasks
    function addTaskToMain(){
        const doesFormExist = document.getElementById("taskForm");
        if(doesFormExist) return;
        const emptyStateMsg = document.querySelector(".defaultMessageDiv");
        if(emptyStateMsg) emptyStateMsg.remove();

        const form = createTaskForm(manager.allProjects, manager.defaultProjectID, manager.getProject(currentProjectId));
        form.taskForm.taskTitle.focus();
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
            form.taskFormModal.remove();
            renderCurrentProject();
        });

        const cancelFormBtn = form.taskForm.querySelector(".cancelTaskBtn");
        cancelFormBtn.addEventListener("click", ()=>{
            form.taskFormModal.remove();
            renderCurrentProject();
        })
    };

    // function to create new projects
    function addProjectToList(){
        const doesTaskFormExist = document.getElementById("taskFormModal");
        if(doesTaskFormExist){
            doesTaskFormExist.remove();
        }
        const form = createProjectForm();
        form.projectForm.projectTitle.focus();
        renderCurrentProject(manager.allProjects);

        form.projectForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            const project = new Project(
                form.projectForm.projectTitle.value
            );
            manager.addProject(project);
            renderProjectList(manager.allProjects, manager.defaultProjectID, currentProjectId, currentView);
            form.projectFormOverlay.remove();
        });

        const cancelProjectBtn = form.projectForm.querySelector(".cancelProjectBtn")
        cancelProjectBtn.addEventListener("click", ()=>{
            form.projectFormOverlay.remove();
            renderCurrentProject(manager.allProjects);
        });
    };

    //listeners for adding tasks and projects
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

    //default inbox project to append tasks to on creation
    const inboxBtn = document.getElementById("inboxBtn");
    inboxBtn.addEventListener("click", ()=>{
        currentView = "inbox";
        currentProjectId = manager.defaultProjectID;
        renderCurrentProject();
        renderProjectLabel();
    });

    //accumlative task section
    const myTasksBtn = document.getElementById("myTasksBtn")
    myTasksBtn.addEventListener("click", ()=>{
        currentView = "myTasks";
        let tasks = [];

        const projects = manager.allProjects;

        for(const project of projects){
            const projectTasks = project.allTasks;
            tasks.push(...projectTasks);
        }

        renderController(tasks, manager.allProjects, manager.defaultProjectID);
        renderProjectList(manager.allProjects, manager.defaultProjectID, currentProjectId, currentView);
        const currentProjectLabel = document.getElementById("currentProjectLabel");
        currentProjectLabel.textContent = "My Tasks";
    });

    //search tasks button (look up all tasks by title?)
    const searchBtn = document.getElementById("searchBtn")
    searchBtn.addEventListener("click", ()=>{

    });

    //completed tasks switching and display
    const completedTasksBtn = document.getElementById("completedBtn");
    completedTasksBtn.addEventListener("click", ()=>{
        currentView = "completedTasks";
        let tasks = [];

        const projects = manager.allProjects;

        for(const project of projects){
            const projectTasks = project.allTasks;
            for(let i = 0; i < projectTasks.length; i++){
                if(projectTasks[i].completed === true){
                    tasks.push(projectTasks[i]);
                }
            }
        }

        renderController(tasks, manager.allProjects, manager.defaultProjectID);
        renderProjectList(manager.allProjects, manager.defaultProjectID, currentProjectId, currentView);
        const currentProjectLabel = document.getElementById("currentProjectLabel");
        currentProjectLabel.textContent = "Completed";
    });

    // taskItem event listeners 
    const taskArea = document.getElementById("taskArea");
    taskArea.addEventListener("click", (event)=>{
        const isDeleteButton = event.target.closest(".deleteTaskBtn");
        const isEditButton = event.target.closest(".editTaskBtn");
        const isCancelEditBtn = event.target.closest(".cancelEditBtn");
        const isSaveEditBtn = event.target.closest(".saveEditBtn");
        const isCompletedCheckbox = event.target.closest(".completedCheckbox");
        if(!isDeleteButton && !isEditButton && !isCancelEditBtn && !isSaveEditBtn && !isCompletedCheckbox) return;
        if(isDeleteButton){
            const task = event.target.closest(".taskItem");
            const idToDelete = task.dataset.id;
            const project = manager.getProject(currentProjectId);
            project.removeTask(idToDelete)
            renderCurrentProject();
        }
        if(isEditButton){
            const task = event.target.closest(".taskItem");
            if (task.classList.contains("editing")) return;
                
            const title = task.querySelector(".taskItemTitle");
            title.readOnly = false;
            const description = task.querySelector(".taskItemDescription");
            description.readOnly = false;
            const dueDate = task.querySelector(".taskItemDueDate");
            dueDate.readOnly = false;

            task.classList.add("editing");
            title.focus();
        }
        if(isCancelEditBtn){
            const task = event.target.closest(".taskItem");
            task.classList.remove("editing");
            renderCurrentProject();
        };
        if(isSaveEditBtn){
            const task = event.target.closest(".taskItem");

            const title = task.querySelector(".taskItemTitle");
            title.readOnly = true;
            const description = task.querySelector(".taskItemDescription");
            description.readOnly = true;
            const dueDate = task.querySelector(".taskItemDueDate");
            dueDate.readOnly = true;
            const prioritySelector = task.querySelector(".taskItemPriority");
            prioritySelector.style.display = "none";
            const projectSelector = task.querySelector(".editProjectSelector");

            const idToEdit = task.dataset.id;
            const taskToEdit = manager.getProject(currentProjectId).getTask(idToEdit);

            taskToEdit.title = title.value;
            taskToEdit.description = description.value;
            taskToEdit.dueDate = dueDate.value;
            taskToEdit.priority = prioritySelector.value;

            const projectToRemoveFrom = manager.getProject(taskToEdit.projectId);
            projectToRemoveFrom.removeTask(idToEdit);
            manager.addTaskToProject(projectSelector.value, taskToEdit);

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

    //projectList event listeners
    const projectList = document.getElementById("projectList");
    projectList.addEventListener("click", (event)=>{
        const isProject = event.target.closest(".projectButton")
        const isRemoveBtn = event.target.closest(".removeProjectBtn");
        if(!isProject && !isRemoveBtn) return;
        if(isProject){
            taskArea.innerHTML = "";
            currentView = "project";
            currentProjectId = isProject.dataset.id;
            renderCurrentProject();
            renderProjectLabel();
        }
        if(isRemoveBtn){
            const project = event.target.closest(".projectItem");
            const idToDelete = project.dataset.id;
            manager.removeProject(idToDelete);
            currentProjectId = manager.defaultProjectID;
            renderCurrentProject();
            renderProjectLabel();
        }
    })

    //sorting tasks logic
    const sortSelect = document.getElementById("sortTasks");
    sortSelect.addEventListener("change", ()=>{
        const project = manager.getProject(currentProjectId);
        const tasks = project.sortTasks(sortTasks.value);
        renderController(tasks, manager.allProjects, manager.defaultProjectID);
    })
}