// This module will have a class with a constructor for tasks when created
export default class Task{
    constructor(title, description, dueDate, priority){
        this.id = crypto.randomUUID();
        this.createdDate = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    // Add methods here if needed?
}