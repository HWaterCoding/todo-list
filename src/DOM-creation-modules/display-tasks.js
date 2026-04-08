//renderController to be exported and run, renderEmptyState and renderTaskList depending on data state
export function renderController(tasks){
    const main = document.getElementById("main");

    //might have to change length to =< 1, if "inbox" is hardcoded in as a project.
    if(tasks.length === 0){
        renderEmptyState(main);
    } else{
        renderTaskList(main, tasks);
    }
}

function renderEmptyState(main){

    main.innerHTML = "";

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
    main.appendChild(defaultMessageDiv);
}

function renderTaskList(main, tasks){
    main.innerHTML = "";
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

        const taskItemDueDate = document.createElement("input");
        taskItemDueDate.classList.add("taskItemDueDate");
        taskItemDueDate.type = "date";
        taskItemDueDate.value = task.dueDate;
        taskItemDueDate.readOnly = "true";
        
        taskItemInfo.append(taskItemTitle, taskItemDescription, taskItemDueDate);

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
        main.appendChild(taskItem);
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