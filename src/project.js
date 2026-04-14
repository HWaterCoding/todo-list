export default class Project{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }

    static priorityValue = (priority) => {
        switch(priority){
            case "highPriority": return 3;
            case "mediumPriority": return 2;
            case "lowPriority": return 1;
            default: return 0;
        }
    };

    static sortOptions = {
        alphabetical: (a, b) => a.title.localeCompare(b.title),
        reverseAlphabetical: (a, b) => b.title.localeCompare(a.title),
        dueSoon: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
        recentlyAdded:(a, b) => b.createdDate - a.createdDate,
        orderCreated: (a, b) => a.createdDate - b.createdDate,
        highPriority: (a, b) => Project.priorityValue(b.priority) - Project.priorityValue(a.priority),
        lowPriority: (a, b) => Project.priorityValue(a.priority) - Project.priorityValue(b.priority),
    }

    sortTasks(selectedSort){
        const sortStrategy = Project.sortOptions[selectedSort] ?? Project.sortOptions.orderCreated;
        return [...this.tasks].sort(sortStrategy);
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(taskID){
        this.tasks = this.tasks.filter(task => task.id !== taskID);
    }

    getTask(taskID){
        return this.tasks.find(task => task.id === taskID);
    }

    get allTasks(){
        return [...this.tasks];
    }
}