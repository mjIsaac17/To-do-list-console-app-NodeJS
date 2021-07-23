const Tarea = require('./task');

class Tasks {
    _list = {}; //this is not required

    get getListArray(){
        const list = [];
        Object.keys(this._list).forEach(key => list.push(this._list[key]));
        return list;
    }

    constructor() {
        this._list = {};
    }

    createTask(desc = ''){
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }

    loadTasksFromArray(tasks = []){
        if(tasks){
            tasks.forEach((task) => {
                this._list[task.id] = task;
            });
        }
    }

    listTasks(){
        //this.getListArray.forEach((task, index) => { //Without destructuring
        this.getListArray.forEach(({desc, completedIn}, index) => {
            // const i = (index + 1).toString().green;
            const i = `${index + 1}`.green;
            const state = completedIn == null ? 'Pending'.red : 'Completed'.green; //ternario
            // console.log(`${i + '.'.green} ${task.desc} :: ${((task.completedIn == null) ? 'Pending'.red : 'Completed').green}`);
            console.log(`${i + '.'.green} ${desc} :: ${state}`);
        });      
    }

    listCompletedTasks(completed = true){
        //let state = '';
        this.getListArray.forEach(({desc, completedIn}, index) => {
            const i = `${index + 1}`.green;
            const state = completedIn == null ? 'Pending'.red : 'Completed'.green;
            if(completed){
                if(completedIn != null)
                    console.log(`${i + '.'.green} ${desc} :: ${completedIn.green}`);
            }          
            else{
                if(completedIn == null)
                   console.log(`${i + '.'.green} ${desc} :: ${state}`); 
            }
        });
    }

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }
    
    markTasksAsCompleted (ids = []) {
        ids.forEach( id => {
            const task = this._list[id];
            if(!task.completedIn){
                task.completedIn = new Date().toISOString();
            }
        });

        this.getListArray.forEach(task => {
            if(!ids.includes(task.id))
                this._list[task.id].completedIn = null;
        });
    }
    
}

module.exports = Tasks;