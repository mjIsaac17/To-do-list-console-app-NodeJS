const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do yo want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete tasks`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.log('==========================='.cyan);
    console.log('   Select an option');
    console.log('===========================\n'.cyan);
    
    const {option} = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listTasksToDelete = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });
    //add an option in the beggining
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    })
    const questions = [
        {
            type: 'list',
            name: 'id', //value returned in line 98
            message: 'Borrar',
            choices
        }
    ];
    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm', //the types are defined in inquire's documentation
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showCheckList = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedIn != null) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids', //value returned in line 98
            message: 'Select',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirm,
    showCheckList
}