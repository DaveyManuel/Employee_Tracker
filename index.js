const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// look at activity 9 Ice Cream CRUD

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Guitar1*995',
    database: 'employee_tracker_DB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    startQuestions();
  });
  
const menuQuestions = [
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add employee', 'Add role', 'Add department', 'View employee table', 'View role table', 'View department table', 'Update employee role', 'EXIT']
    }
];

const departmentQuestions = [
    {
        name: 'department',
        type: 'input',
        message: "What's the name of the department you would like to add?"
    }
]

const startQuestions = ()=>{
    inquirer
    .prompt(menuQuestions)
    .then(answers =>{
        switch (answers.menu) {
            case 'Add employee':
                //call back add employee function
                break;
            case 'Add role':
                //call back add employee function
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'View employee table':
                //call back add employee function
                break;
            case 'View role table':
                //call back add employee function
                break;
            case 'View department table':
                viewDepartment();
                break;
            case 'Update employee role':
                //call back add employee function
                break;
            case 'EXIT':
                connection.end();
                break;
        
            default:
                break;
        }
    })
};

const viewDepartment = ()=>{
    connection.query('SELECT * FROM department', (err, res) => {
        if(err) throw (err);
        console.table(res);
        startQuestions();
    } )
}

const addDepartment = ()=>{
    inquirer
    .prompt(departmentQuestions)
    .then(answers =>{
        connection.query('INSERT INTO department SET ?',
        
        {
            name: answers.department
        },
        (err, res)=>{
            if (err) throw (err);
            console.log(`${res.affectedRows} department inserted!\n`);
            startQuestions();
        }
        )

    })
}




