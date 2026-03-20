//renderController to be exported and run, renderEmptyState and renderTaskList depending on data state

function renderEmptyState(main){
    const defaultMessageDiv = document.createElement("div");
    defaultMessageDiv.id = "defaultMessageDiv";
    
    const defaultMessageH3 = document.createElement("h3");
    defaultMessageH3.textContent = "You don't have any tasks yet.";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "defaultAddTaskBtn";
    const addTaskIcon = document.createElement("i");
    addTaskIcon.classList.add("fa-solid", "fa-plus");
    addTaskBtn.textContent = "Add Tasks";
    addTaskBtn.append(addTaskIcon);

    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "defaultAddProjectBtn";
    const addProjectIcon = document.createElement("i");
    addProjectIcon.classList.add("fa-solid", "fa-plus");
    addProjectBtn.textContent = "Add Projects";
    addProjectBtn.append(addProjectIcon);

    defaultMessageDiv.append(defaultMessageH3, addTaskBtn, addProjectBtn);
    main.appendChild(defaultMessageDiv);
}


function renderTaskList(main, tasks){
    // use forEach to go through each task and render information to list 
}


export function renderController(tasks){
    const main = document.getElementById("main");

    if(tasks.length === 0){
        renderEmptyState(main);
    } else{
        renderTaskList(main, tasks);
    }

}