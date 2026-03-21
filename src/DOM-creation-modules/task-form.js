export default function createTaskForm(projects){

    const main = document.getElementById("main");

    const formModal = document.createElement("div");
    formModal.id = "formModal";
    main.appendChild(formModal);

    const form = document.createElement("form");
    form.id = "form";
    formModal.appendChild(form);

    const formBox1 = document.createElement("div");
    formBox1.id = "formBox1";
    
    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Name your task";
    
    const taskDescription = document.createElement("input");
    taskDescription.type = "text";
    taskDescription.placeholder = "Description";
    
    const selectionBox = document.createElement("div");

    //Make a calendar input here

    
    //Make a priority select element here
    const prioritySelector = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Priority";
    defaultOption.hidden = true;
    const highOption = document.createElement("option");
    highOption.textContent = "High";
    highOption.value = "highPriority";
    const mediumOption = document.createElement("option");
    mediumOption.textContent = "Medium";
    mediumOption.value = "mediumPriority";
    const lowOption = document.createElement("option");
    lowOption.textContent = "Low";
    lowOption.value = "lowPriority";
    prioritySelector.append(defaultOption, highOption, mediumOption, lowOption);

    selectionBox.append(prioritySelector); //append calendar
    formBox1.append(taskTitle, taskDescription, selectionBox);

    const formBox2 = document.createElement("div");
    formBox2.id = "formBox2";

    //Make a project selector drop-down list here
    const projectSelector = document.createElement("select");
    //Grab projects from project-manager module .allTasks and loop through to create options

    const cancelTaskBtn = document.createElement("button");
    cancelTaskBtn.textContent = "Cancel";
    cancelTaskBtn.id = "cancelTaskBtn";
    cancelTaskBtn.addEventListener("click", ()=>{
        formModal.remove();
    });

    const submitFormBtn = document.createElement("button");
    submitFormBtn.type = "submit";
    submitFormBtn.textContent = "Add Task";
    submitFormBtn.id = "submitFormBtn";

    formBox2.append(projectSelector, cancelTaskBtn, submitFormBtn);

    form.append(formBox1, formBox2);
    form.addEventListener("submit", (event)=>{
        event.preventDefault();

        //probably need to run a callback function as a parameter
    })

    return { form }
}