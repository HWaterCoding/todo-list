import Project from "./project.js";
import Task from "./task.js";

export default class AppManager{
    constructor(){
        this.projects = [];
        const isStored = localStorage.getItem("projects");
        if(isStored){
            this.loadStorage();
        } else{
            const inbox = new Project("Inbox");
            this.projects.push(inbox);
            this.inboxProjectId = inbox.id;
        }
    }

    populateStorage(){
        localStorage.setItem("projects", JSON.stringify(this.allProjects));
    }

    loadStorage(){
        const parsedProjects = JSON.parse(localStorage.getItem("projects"));
        this.projects = parsedProjects.map(projectData =>{
            const project = new Project(projectData.name);
            project.id = projectData.id;
            project.tasks = (projectData.tasks || []).map(taskData =>{
                const task = new Task(
                    taskData.title,
                    taskData.description,
                    taskData.dueDate,
                    taskData.priority,
                )
                task.id = taskData.id;
                task.createdDate = taskData.createdDate;
                task.completed = taskData.completed;
                task.projectId = taskData.projectId;
                return task;
            })
            return project;
        })
        this.inboxProjectId = this.projects.find(project => project.name === "Inbox")?.id;
    }

    addProject(project){
        this.projects.push(project);
        this.populateStorage();
    }

    removeProject(projectID){
        if(projectID === this.defaultProjectID) return;
        this.projects = this.projects.filter(project => project.id !== projectID);
        this.populateStorage();
    }

    getProject(projectID){
        return this.projects.find(project => project.id === projectID);
    }

    addTaskToProject(projectID, task){
        const project = this.getProject(projectID);
        if(project){
            task.projectId = projectID;
            project.addTask(task);
            this.populateStorage();
        }
    }

    removeTaskFromProject(projectID, task){
        const project = this.getProject(projectID);
        if(project){
            project.removeTask(task)
            this.populateStorage();
        }
    }
    //add a removeTaskFromProject() function here

    toggleTaskCompletion(projectID, taskID){
        const project = this.getProject(projectID);
        const task = project.getTask(taskID);
        task.toggleCompletion();
        this.populateStorage();
    }
    
    get allProjects(){
        return [...this.projects];
    }

    get defaultProjectID(){
        return this.inboxProjectId;
    }
}