// import Task from "./task.js";

// This module will act as a "Library" if "tasks" are your books.
export default class TaskManager{
    constructor(){
        this.manager = [];
    }

    // static sortTasks = {

    // }
    //probably need sort methods here too

    addTask(task){
        this.manager.push(task);
    }

    removeTask(idToDelete){
        this.manager = this.manager.filter(task => task.id !== idToDelete)
    }

    getTaskById(id) {
       return this.manager.find(task => task.id === id);
    }
    
    get allTasks(){
        return [...this.manager];
    }

}