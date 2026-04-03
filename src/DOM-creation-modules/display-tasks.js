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
    tasks.forEach(task => {
        
    });
}

//add function to render project list on the sidebar
export function renderProjectList(projects){
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    projects.forEach(project =>{
        const projectButton = document.createElement("button");
        projectButton.textContent = project.name;

        projectList.appendChild(projectButton);
    });
}