const Tarea = require('./task');

class Tasks {
    _list = {}; //this is not required

    constructor() {
        this._list = {};
    }

    createTask(desc = ''){
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }
    
}

module.exports = Tasks;