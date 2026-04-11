//renderController to be exported and run, renderEmptyState and renderTaskList depending on data state
export function renderController(tasks){
    const taskArea = document.getElementById("taskArea");
    taskArea.innerHTML = "";

    if(tasks.length === 0){
        renderEmptyState(taskArea);
    } else{
        renderTaskList(taskArea, tasks);
    }
}

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

function renderTaskList(taskArea, tasks){
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

        if(task.priority === "highPriority") {
            taskItem.classList.add("highPriority");
            taskItem.classList.remove("mediumPriority");
            taskItem.classList.remove("lowPriority");
            completedCheckbox.classList.add("highPriority");
            completedCheckbox.classList.remove("mediumPriority");
            completedCheckbox.classList.remove("lowPriority");
        };
        if(task.priority === "mediumPriority") {
            taskItem.classList.add("mediumPriority");
            taskItem.classList.remove("highPriority");
            taskItem.classList.remove("lowPriority");
            completedCheckbox.classList.add("mediumPriority");
            completedCheckbox.classList.remove("highPriority");
            completedCheckbox.classList.remove("lowPriority");
        };
        if(task.priority === "lowPriority") {
            taskItem.classList.add("lowPriority");
            taskItem.classList.remove("highPriority");
            taskItem.classList.remove("mediumPriority");
            completedCheckbox.classList.add("lowPriority");
            completedCheckbox.classList.remove("highPriority");
            completedCheckbox.classList.remove("mediumPriority");
        };

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

        const taskItemDueDate = document.createElement("input");
        taskItemDueDate.classList.add("taskItemDueDate");
        taskItemDueDate.type = "date";
        taskItemDueDate.value = task.dueDate;
        //put in a check so that if no date is selected, don't display mm/dd/yyyy, display nothing
        taskItemDueDate.readOnly = "true";

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
        taskItemSelectionBox.append(taskItemPriority, taskItemDueDate);

        //I also need to add in the project selector to allow them to switch projects for the task.
        
        taskItemInfo.append(taskItemTitle, taskItemDescription, taskItemSelectionBox);

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
        taskItemButtons.append(editAndDeleteBtn);

        taskItem.append(completedCheckbox, taskItemInfo, taskItemButtons);
        taskArea.appendChild(taskItem);
    });
}

export function renderProjectList(projects){
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    projects.forEach(project =>{

        const projectItem = document.createElement("div");
        projectItem.classList.add("projectItem");
        projectItem.dataset.id = project.id;

        const projectButton = document.createElement("button");
        projectButton.classList.add("projectButton");
        projectButton.textContent = project.name;
        projectButton.dataset.id = project.id;

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("removeProjectBtn", "sidebar-btn");
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("fa-solid", "fa-circle-xmark");
        removeProjectBtn.appendChild(removeIcon);

        projectButton.appendChild(removeProjectBtn);

        projectItem.append(projectButton, removeProjectBtn);

        projectList.appendChild(projectItem);
    });
}