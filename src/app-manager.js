import Project from "./project.js";

export default class AppManager{
    constructor(){
        this.projects = [];
        const inbox = new Project("Inbox");
        this.projects.push(inbox);
        this.inboxProjectId = inbox.id;
    }

    // static sortTasks = {
        //probably need sort methods here too
    // }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(projectID){
        this.projects = this.projects.filter(project => project.id !== projectID);
    }

    getProject(projectID){
        return this.projects.find(project => project.id === projectID);
    }

    addTaskToProject(projectID, task){
        const project = this.getProject(projectID);
        if(project){
            project.addTask(task);
        }
    }
    
    get allProjects(){
        return [...this.projects];
    }

    get defaultProjectID(){
        return this.inboxProjectId;
    }
}