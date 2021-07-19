
const { inquirerMenu, pause } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
//const { showMenu, pause } = require('./helpers/messages');

require ('colors');

const main = async() => {
    let option = '';
    do{
        //option = await showMenu();
        option = await inquirerMenu();
        switch(option){
            
        }

        if(option !== '0') await pause();

    }while(option !== '0');
}

main();