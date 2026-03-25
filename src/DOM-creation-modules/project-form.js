//form module for project creation
export default function createProjectForm(){
    //change to body?
    const body = document.querySelector('body');

    const projectFormOverlay = document.createElement("div");
    projectFormOverlay.id = "projectFormOverlay";
    body.appendChild(projectFormOverlay);

    const projectFormModal = document.createElement("div");
    projectFormModal.id = "projectFormModal";
    projectFormOverlay.appendChild(projectFormModal);

    const projectForm = document.createElement("form");
    projectForm.id = "projectForm";
    projectFormModal.appendChild(projectForm);

    const projectTitle = document.createElement("input");
    projectTitle.type = "text";
    projectTitle.placeholder = "Name your project"
    
    // const projectTheme = document.createElement("");
    // projectTheme.id = "projectTheme";
    
    // projectIcon = document.createElement("");
    // projectIcon.id = "projectIcon";

    const projectBtnContainer = document.createElement("div");
    projectBtnContainer.id = "projectBtnContainer";
    
    const submitProjectBtn = document.createElement("button");
    submitProjectBtn.type = "submit";
    submitProjectBtn.textContent = "Submit Project";
    submitProjectBtn.id = "submitProjectBtn";
    
    const cancelProjectBtn = document.createElement("button");
    cancelProjectBtn.textContent = "Cancel Project";
    cancelProjectBtn.addEventListener("click", ()=>{
        projectFormOverlay.remove();
    });

    projectBtnContainer.append(submitProjectBtn, cancelProjectBtn);
    projectForm.append(projectTitle, projectBtnContainer);

    return { projectForm }
}