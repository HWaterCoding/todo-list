export default function createTaskForm(projects, defaultProjectID, currentProject){

    const taskArea = document.getElementById("taskArea");

    const taskFormModal = document.createElement("div");
    taskFormModal.id = "taskFormModal";
    taskFormModal.classList.add("taskFormModal");
    taskArea.appendChild(taskFormModal);

    const taskForm = document.createElement("form");
    taskForm.id = "taskForm";
    taskFormModal.appendChild(taskForm);

    const formBox1 = document.createElement("div");
    formBox1.id = "formBox1";
    
    const taskTitle = document.createElement("input");
    taskTitle.id = "taskTitle";
    taskTitle.type = "text";
    taskTitle.placeholder = "Name your task";
    taskTitle.required = "true";
    
    const taskDescription = document.createElement("input");
    taskDescription.id = "taskDescription";
    taskDescription.type = "text";
    taskDescription.placeholder = "Description";
    
    const selectionBox = document.createElement("div");
    selectionBox.id = "selectionBox";

    const dueDate = document.createElement("input");
    dueDate.id = "dueDate";
    dueDate.type = "date";

    const prioritySelector = document.createElement("select");
    prioritySelector.classList.add("prioritySelector");
    prioritySelector.id = "prioritySelector";
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

    prioritySelector.append(defaultPriorityOption, highOption, mediumOption, lowOption);

    selectionBox.append(prioritySelector, dueDate);
    formBox1.append(taskTitle, taskDescription, selectionBox);

    const formBox2 = document.createElement("div");
    formBox2.id = "formBox2";

    const projectSelector = document.createElement("select");
    projectSelector.id = "projectSelector";
    for(const project of projects){
        const projectOption = document.createElement("option");
        projectOption.textContent = project.name;
        if(project.id === defaultProjectID){
            projectOption.textContent = "Inbox (default)";
        }
        if(project.id === currentProject.id){
            projectOption.selected = true;
        }
        projectOption.value = project.id;
        projectSelector.appendChild(projectOption);
    }

    const cancelTaskBtn = document.createElement("button");
    cancelTaskBtn.type = "button";
    cancelTaskBtn.textContent = "Cancel";
    cancelTaskBtn.classList.add("cancelTaskBtn");

    const submitFormBtn = document.createElement("button");
    submitFormBtn.type = "submit";
    submitFormBtn.textContent = "Add Task";
    submitFormBtn.classList.add("submitFormBtn");

    formBox2.append(projectSelector, cancelTaskBtn, submitFormBtn);

    taskForm.append(formBox1, formBox2);

    return { taskForm, taskFormModal }
}