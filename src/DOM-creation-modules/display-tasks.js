//controller to decide which rendering function to execute based on state
export function renderController(tasks, projects, defaultProjectID){
    const taskArea = document.getElementById("taskArea");
    taskArea.innerHTML = "";

    if(tasks.length === 0){
        renderEmptyState(taskArea);
    } else{
        renderTaskList(taskArea, tasks, projects, defaultProjectID);
    }
}

//default render state if no tasks found, prompting user to add tasks
function renderEmptyState(taskArea){

    const defaultMessageDiv = document.createElement("div");
    defaultMessageDiv.classList.add("defaultMessageDiv");
    
    const defaultMessageH3 = document.createElement("h3");
    defaultMessageH3.textContent = "You don't have any tasks yet!";

    const defaultMessageh4 = document.createElement("h4");
    defaultMessageh4.textContent = "Click below to add a task or project.";

    const defaultButtonsContainer = document.createElement("div");
    defaultButtonsContainer.classList.add("defaultButtonsContainer");

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("defaultAddTaskBtn");
    const addTaskIcon = document.createElement("i");
    addTaskIcon.classList.add("fa-solid", "fa-plus");
    addTaskBtn.append(addTaskIcon, "Add Tasks");

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("defaultAddProjectBtn");
    const addProjectIcon = document.createElement("i");
    addProjectIcon.classList.add("fa-solid", "fa-plus");
    addProjectBtn.append(addProjectIcon, "Add Projects");

    defaultButtonsContainer.append(addTaskBtn, addProjectBtn)

    defaultMessageDiv.append(defaultMessageH3, defaultMessageh4, defaultButtonsContainer);
    taskArea.appendChild(defaultMessageDiv);
}

//function for rendering every single task in a project
function renderTaskList(taskArea, tasks, projects, defaultProjectID){
    tasks.forEach(task => {

        const taskItem = document.createElement("div");
        taskItem.classList.add("taskItem");
        taskItem.dataset.id = task.id;

        const completedCheckbox = document.createElement("input")
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = task.completed;
        completedCheckbox.classList.add("completedCheckbox");
        if(task.completed){
            taskItem.classList.add("taskItemCompleted");
        } 
        
        taskItem.classList.remove("highPriority", "mediumPriority", "lowPriority");
        completedCheckbox.classList.remove("highPriority", "mediumPriority", "lowPriority");
        
        if(task.priority){
            taskItem.classList.add(task.priority);
            completedCheckbox.classList.add(task.priority);
        }

        const taskItemInfo = document.createElement("div");
        taskItemInfo.classList.add("taskItemInfo");

        const taskItemTitle = document.createElement("input");
        taskItemTitle.classList.add("taskItemTitle");
        taskItemTitle.type = "text";
        taskItemTitle.value = task.title;
        taskItemTitle.readOnly = "true";

        const taskItemDescription = document.createElement("input");
        taskItemDescription.classList.add("taskItemDescription");
        taskItemDescription.type = "text";
        taskItemDescription.value = task.description;
        taskItemDescription.readOnly = "true";

        const taskItemSelectionBox = document.createElement("div");
        taskItemSelectionBox.classList.add("taskItemSelectionBox");

        const taskItemPriority = document.createElement("select");
        taskItemPriority.classList.add("taskItemPriority");

        const defaultPriorityOption = document.createElement("option");
        defaultPriorityOption.value = "";
        defaultPriorityOption.textContent = "Priority";
        defaultPriorityOption.hidden = true;

        const highOption = document.createElement("option");
        highOption.value = "highPriority";
        highOption.textContent = "High";

        const mediumOption = document.createElement("option");
        mediumOption.value = "mediumPriority";
        mediumOption.textContent = "Medium";

        const lowOption = document.createElement("option");
        lowOption.value = "lowPriority";
        lowOption.textContent = "Low";

        taskItemPriority.append(defaultPriorityOption, highOption, mediumOption, lowOption);

        const taskItemDueDate = document.createElement("input");
        taskItemDueDate.classList.add("taskItemDueDate");
        taskItemDueDate.type = "date";
        if (task.dueDate) {
            taskItemDueDate.value = task.dueDate;
        } else {
            taskItemDueDate.style.display = "none";
        }
        taskItemDueDate.style.display = "none";

        const dueDateDisplay = document.createElement("span");
        dueDateDisplay.classList.add("dueDateDisplay");
        if (task.dueDate) {
            dueDateDisplay.textContent = task.dueDate;
        } else {
            dueDateDisplay.textContent = "";
        }
        
        taskItemSelectionBox.append(taskItemPriority, taskItemDueDate, dueDateDisplay);
        taskItemInfo.append(taskItemTitle, taskItemDescription, taskItemSelectionBox);


        //EDITING TASK ITEMS
        const taskItemButtons = document.createElement("div");
        taskItemButtons.classList.add("taskItemButtons");

        const editAndDeleteBtn = document.createElement("div");
        editAndDeleteBtn.classList.add("editAndDeleteBtn");

        const editTaskBtn = document.createElement("button");
        editTaskBtn.classList.add("editTaskBtn");
        const editTaskIcon = document.createElement("i");
        editTaskIcon.classList.add("fa-regular", "fa-pen-to-square");
        editTaskBtn.appendChild(editTaskIcon);

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("deleteTaskBtn");
        const deleteTaskIcon = document.createElement("i");
        deleteTaskIcon.classList.add("fa-solid", "fa-trash-can");
        deleteTaskBtn.appendChild(deleteTaskIcon);

        editAndDeleteBtn.append(editTaskBtn, deleteTaskBtn);

        const editTaskButtonContainer = document.createElement("div");
        editTaskButtonContainer.classList.add("editTaskButtonContainer", "editControls");

        const editProjectSelector = document.createElement("select");
        editProjectSelector.classList.add("editProjectSelector");
        for(const project of projects){
            const projectOption = document.createElement("option");
            projectOption.textContent = project.name;
            if(project.id === defaultProjectID){
                projectOption.textContent = "Inbox (default)";
            }
            projectOption.value = project.id;
            editProjectSelector.appendChild(projectOption);
        }
        editProjectSelector.value = task.projectId || defaultProjectID;

        const cancelEditBtn = document.createElement("button");
        cancelEditBtn.classList.add("cancelEditBtn");
        cancelEditBtn.textContent = "Cancel";

        const saveEditBtn = document.createElement("button");
        saveEditBtn.classList.add("saveEditBtn");
        saveEditBtn.textContent = "Save Changes";
            
        editTaskButtonContainer.append(editProjectSelector, cancelEditBtn, saveEditBtn);

        taskItemButtons.append(editAndDeleteBtn, editTaskButtonContainer);

        taskItem.append(completedCheckbox, taskItemInfo, taskItemButtons);
        taskArea.appendChild(taskItem);
    });
}

//function to handle sidebar project lists
export function renderProjectList(projects, defaultProjectID, currentProjectId, currentView){
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    const filteredProjects = projects.filter(project => project.id !== defaultProjectID);

    filteredProjects.forEach(project =>{

        const projectItem = document.createElement("div");
        projectItem.classList.add("projectItem");
        projectItem.dataset.id = project.id;
        projectItem.title = project.name;

        const projectButton = document.createElement("button");
        projectButton.classList.add("projectButton");
        projectButton.dataset.id = project.id;
        const nameSpan = document.createElement("span");
        nameSpan.textContent = project.name;
        projectButton.appendChild(nameSpan);

        if(currentView === "project" && project.id === currentProjectId){
            projectButton.classList.add("active");
        }

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("removeProjectBtn", "sidebar-btn");
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("fa-solid", "fa-circle-xmark");
        removeProjectBtn.appendChild(removeIcon);

        projectItem.append(projectButton);
        projectButton.append(removeProjectBtn);

        projectList.appendChild(projectItem);
    });
}