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
        choices: ['Add employee', 'Add role', 'Add department', 'View employee table', 'View role table', 'View department table', 'EXIT']
    }
];

const departmentQuestions = [
    {
        name: 'department',
        type: 'input',
        message: "What's the name of the department you would like to add?"
    }
];

const roleQuestions = [
    {
        name: 'role',
        type: 'input',
        message: 'What role would you like to add?'
    },
    {
        name: 'salary',
        type: 'input',
        message: "Please input the role's yearly salary."
    },

];

const employeeQuestions = [
    {
        name: 'firstName',
        type: 'input',
        message: 'Please tell us the first name of the employee you would like to add today.'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is their last name?'
    },
    {
        name: 'role',
        type: 'input',
        message: "What is the employee's role?"
    },
    {
        name: 'manager',
        type: 'input',
        message: "Please input the employee's manager"
    }
]

const startQuestions = ()=>{
    inquirer
    .prompt(menuQuestions)
    .then(answers =>{
        switch (answers.menu) {
            case 'Add employee':
                addEmployee();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'View employee table':
                viewEmployee();
                break;
            case 'View role table':
                viewRole();
                break;
            case 'View department table':
                viewDepartment();
                break;
           // case 'Update employee role':
                //call back add employee function
              //  break;
            case 'EXIT':
                connection.end();
                break;
        
            default:
                break;
        }
    })
};

const addRole = ()=>{
    inquirer
    .prompt(roleQuestions)
    .then(answers =>{
        connection.query('INSERT INTO role SET ?',
        {
            title: answers.role,
            salary: answers.salary
            //department_id:
        },
        (err,res)=>{
            if (err) throw (err);
            console.log(`${res.affectedRows} role inserted!\n`);
            startQuestions();
        }
        )
    })
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
};

const addEmployee = ()=>{
    inquirer
    .prompt(employeeQuestions)
    .then(answers =>{
        connection.query('INSERT INTO employee SET ?',
        
        {
            firstName: answers.firstName,
            lastName: answers.lastName,
            role: answers.role,
            manager: answers.manager
            // for ID's maybe I need an if else? If answers.employeeRole === manager || Manager then give appropriate ID
            // role_id:
            // manager_id:
        },
        (err, res)=>{
            if (err) throw (err);
            console.log(`${res.affectedRows} employee inserted!\n`);
            startQuestions();
        }

        )
    })
}

const viewEmployee = () => {
    connection.query('SELECT * FROM employee', (err,res) => {
        if (err) throw (err);
        console.table(res);
        startQuestions();
    })
}

const viewDepartment = ()=>{
    connection.query('SELECT * FROM department', (err, res) => {
        if(err) throw (err);
        console.table(res);
        startQuestions();
    } )
};

const viewRole = ()=>{
    connection.query('SELECT * FROM role', (err,res) => {
        if (err) throw (err);
        console.table(res);
        startQuestions();
    })
}





