export default function createTaskForm(projects){

    const main = document.getElementById("main");

    const taskFormModal = document.createElement("div");
    taskFormModal.id = "taskFormModal";
    main.appendChild(taskFormModal);

    const taskForm = document.createElement("form");
    taskForm.id = "taskForm";
    taskFormModal.appendChild(taskForm);

    const formBox1 = document.createElement("div");
    formBox1.id = "formBox1";
    
    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Name your task";
    
    const taskDescription = document.createElement("input");
    taskDescription.type = "text";
    taskDescription.placeholder = "Description";
    
    const selectionBox = document.createElement("div");
    selectionBox.id = "selectionBox";

    //Make a calendar input here?
    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.placeholder = "25/06/2027";
    //add pattern attribute to date input for validity.

    const prioritySelector = document.createElement("select");
    const defaultPriorityOption = document.createElement("option");
    defaultPriorityOption.value = "";
    defaultPriorityOption.textContent = "Priority";
    defaultPriorityOption.hidden = true;
    const highOption = document.createElement("option");
    highOption.textContent = "High";
    highOption.value = "highPriority";
    const mediumOption = document.createElement("option");
    mediumOption.textContent = "Medium";
    mediumOption.value = "mediumPriority";
    const lowOption = document.createElement("option");
    lowOption.textContent = "Low";
    lowOption.value = "lowPriority";
    prioritySelector.append(defaultPriorityOption, highOption, mediumOption, lowOption);

    selectionBox.append(prioritySelector, dateInput); //append calendar/date picker
    formBox1.append(taskTitle, taskDescription, selectionBox);

    const formBox2 = document.createElement("div");
    formBox2.id = "formBox2";

    //IF a user opens the form, adds a project, then comes back to form, this needs to update.
    const projectSelector = document.createElement("select");
    const defaultProjectOption = document.createElement("option");
    defaultProjectOption.textContent = "My Tasks";
    defaultPriorityOption.value = "My Tasks";
    defaultProjectOption.selected = true;
    projectSelector.appendChild(defaultProjectOption);
    for(const project of projects){
        const projectTitle = document.createElement("option");
        projectTitle.textContent = project;
        projectSelector.appendChild(projectTitle);
    }

    const cancelTaskBtn = document.createElement("button");
    cancelTaskBtn.textContent = "Cancel";
    cancelTaskBtn.id = "cancelTaskBtn";
    cancelTaskBtn.addEventListener("click", ()=>{
        taskFormModal.remove();
    });

    const submitFormBtn = document.createElement("button");
    submitFormBtn.type = "submit";
    submitFormBtn.textContent = "Add Task";
    submitFormBtn.id = "submitFormBtn";

    formBox2.append(projectSelector, cancelTaskBtn, submitFormBtn);

    taskForm.append(formBox1, formBox2);
    // form.addEventListener("submit", (event)=>{
    //     event.preventDefault();

    //     //probably need to run a callback function as a parameter
    // })

    return { taskForm }
}