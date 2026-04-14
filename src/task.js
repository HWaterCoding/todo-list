export default class Task{
    constructor(title, description, dueDate, priority, completed = false){
        this.id = crypto.randomUUID();
        this.createdDate = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    //I think I can remove this method entirely tbh
    toggleCompletion(){
        this.completed = !this.completed;
    }
}