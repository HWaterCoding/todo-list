//project creation module
export default class Project{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(taskID){
        this.tasks = this.tasks.filter(task => task.id !== taskID);
    }
}