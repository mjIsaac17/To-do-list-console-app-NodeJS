
const { inquirerMenu, 
        pause, 
        readInput,
        listTasksToDelete,
        confirm,
        showCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');
//const { showMenu, pause } = require('./helpers/messages');

require ('colors');

const main = async() => {
    let option = '';
    const tasks = new Tasks();

    tasks.loadTasksFromArray(readDB());
    console.log(tasks._list);

    do{
        //option = await showMenu();
        //Print menu. crtl + click to go the function declaration
        option = await inquirerMenu();
        switch(option){
            case '1':
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
            break;
            
            case '2':
                //console.log(tasks._list);
                tasks.listTasks();
            break;

            case '3':
                tasks.listCompletedTasks(true);
            break;

            case '4':
                tasks.listCompletedTasks(false);    
            break;

            case '5': //COmpleted/ Pending
                const ids = await showCheckList(tasks.getListArray);
                tasks.markTasksAsCompleted(ids);
            break;

            case '6':
                const id = await listTasksToDelete(tasks.getListArray);
                if(id !== '0'){
                    const ok = await confirm('¿Estás seguro?');
                    if(ok) {
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
            break;
        }

        saveDB(tasks.getListArray);


        await pause();

    }while(option !== '0');
}

main();