//renderController to be exported and run, renderEmptyState and renderTaskList depending on data state
export function renderController(tasks){
    const main = document.getElementById("main");

    //might have to change length to =< 1, if "My Tasks" is hardcoded in as a project.
    if(tasks.length === 0){
        renderEmptyState(main);
    } else{
        renderTaskList(main, tasks);
    }
}

function renderEmptyState(main){
    const defaultMessageDiv = document.createElement("div");
    defaultMessageDiv.id = "defaultMessageDiv";
    
    const defaultMessageH3 = document.createElement("h3");
    defaultMessageH3.textContent = "You don't have any tasks yet!";

    const defaultMessageh4 = document.createElement("h4");
    defaultMessageh4.textContent = "Click below to add a task or project.";

    const defaultButtonsContainer = document.createElement("div");
    defaultButtonsContainer.id = "defaultButtonsContainer";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "defaultAddTaskBtn";
    const addTaskIcon = document.createElement("i");
    addTaskIcon.classList.add("fa-solid", "fa-plus");
    addTaskBtn.append(addTaskIcon, "Add Tasks");
    //addEventListener here?
    addTaskBtn.addEventListener("click", ()=>{

    });

    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "defaultAddProjectBtn";
    const addProjectIcon = document.createElement("i");
    addProjectIcon.classList.add("fa-solid", "fa-plus");
    addProjectBtn.append(addProjectIcon, "Add Projects");
    //addEventListener here?
    addProjectBtn.addEventListener("click", ()=>{

    });

    defaultButtonsContainer.append(addTaskBtn, addProjectBtn)

    defaultMessageDiv.append(defaultMessageH3, defaultMessageh4, defaultButtonsContainer);
    main.appendChild(defaultMessageDiv);
}

function renderTaskList(main, tasks){
    main.innerHTML = "";
    tasks.forEach(task => {

        const taskItem = document.createElement("div");
        taskItem.id = "taskItem";

        const completedCheckbox = document.createElement("input")
        completedCheckbox.type = "checkbox";
        completedCheckbox.id = "completedCheckbox";

        const taskItemInfo = document.createElement("div");
        taskItemInfo.id = "taskItemInfo";

        const taskItemTitle = document.createElement("input");
        taskItemTitle.id = "taskItemTitle";
        taskItemTitle.type = "text";
        taskItemTitle.value = task.title;
        taskItemTitle.readOnly = "true";

        const taskItemDescription = document.createElement("input");
        taskItemDescription.id = "taskItemDescription";
        taskItemDescription.type = "text";
        taskItemDescription.value = task.description;
        taskItemDescription.readOnly = "true";

        const taskItemDueDate = document.createElement("input");
        taskItemDueDate.id = "taskItemDueDate";
        taskItemDueDate.type = "date";
        taskItemDueDate.value = task.dueDate;
        taskItemDueDate.readOnly = "true";
        
        taskItemInfo.append(taskItemTitle, taskItemDescription, taskItemDueDate);

        const taskItemButtons = document.createElement("div");
        taskItemButtons.id = "taskItemButtons";

        const editTaskBtn = document.createElement("button");
        editTaskBtn.id = "editTaskBtn";
        const editTaskIcon = document.createElement("i");
        editTaskIcon.classList.add("fa-regular", "fa-pen-to-square");
        editTaskBtn.appendChild(editTaskIcon);

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.id = "deleteTaskBtn"
        const deleteTaskIcon = document.createElement("i");
        deleteTaskIcon.classList.add("fa-solid", "fa-trash-can");
        deleteTaskBtn.appendChild(deleteTaskIcon);

        taskItemButtons.append(editTaskBtn, deleteTaskBtn);

        taskItem.append(completedCheckbox, taskItemInfo, taskItemButtons);
        main.appendChild(taskItem);
    });
}

export function renderProjectList(projects){
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    projects.forEach(project =>{
        const projectButton = document.createElement("button");
        projectButton.textContent = project.name;

        projectList.appendChild(projectButton);
    });
}