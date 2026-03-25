import Project from "./project.js";

// This module will act as a "Library" if "tasks" are your books.
export default class AppManager{
    constructor(){
        this.projects = [];
    }

    // static sortTasks = {

    // }
    //probably need sort methods here too

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
        const project = this.projects.getProject(projectID);
        if(project){
            project.addTask(task);
        }
    }
    
    get allProjects(){
        return [...this.projects];
    }
}