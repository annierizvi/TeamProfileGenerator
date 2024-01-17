const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const path = require('path');
const fs = require('fs');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const render = require('./src/page-template.js');

const teamMembers = [];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

function promptManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the manager's employee ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the manager's email address:",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Enter the manager's office number:",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      promptAddTeamMember();
    });
}

function promptAddTeamMember() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'Add an Engineer',
          'Add an Intern',
          'Finish Building the Team',
        ],
      },
    ])
    .then((answers) => {
      if (answers.choice === 'Add an Engineer') {
        promptEngineer();
      } else if (answers.choice === 'Add an Intern') {
        promptIntern();
      } else {
        generateTeamHTML();
      }
    });
}

function promptEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the engineer's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the engineer's employee ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the engineer's email address:",
      },
      {
        type: 'input',
        name: 'github',
        message: "Enter the engineer's GitHub username:",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
      promptAddTeamMember();
    });
}

function promptIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the intern's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the intern's employee ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the intern's email address:",
      },
      {
        type: 'input',
        name: 'school',
        message: "Enter the intern's school:",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      promptAddTeamMember();
    });
}

function generateTeamHTML() {
  let teamHTML = `
    <!DOCTYPE html>
    <html lang="en-gb">
    <head>
      <meta charset="UTF-8">
      <title>My Team</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <link rel="stylesheet" href="assets/style.css">
    </head>
    <body>
      <div class="container">
        <h1 class="my-5">My Team</h1>
        <div class="row">
  `;

  teamMembers.forEach((member) => {
    teamHTML += `
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${member.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${member.getRole()}</h6>
            <p class="card-text">ID: ${member.getId()}</p>
            <p class="card-text">Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></p>
  `;

    if (member.getRole() === 'Manager') {
      teamHTML += `
        <p class="card-text">Office Number: ${member.getOfficeNumber()}</p>
      `;
    }

    if (member.getRole() === 'Engineer') {
      teamHTML += `
        <p class="card-text">GitHub: <a href="https://github.com/${member.getGithub()}" target="_blank">${member.getGithub()}</a></p>
      `;
    }

    if (member.getRole() === 'Intern') {
      teamHTML += `
        <p class="card-text">School: ${member.getSchool()}</p>
      `;
    }

    teamHTML += `
          </div>
        </div>
      </div>
    `;
  });

  teamHTML += `
        </div>
      </div>
    </body>
    </html>
  `;

  const htmlFilePath = path.join(__dirname, 'output', 'team.html');

  fs.writeFile(htmlFilePath, teamHTML, (err) => {
    if (err) {
      console.error('Error writing HTML file:', err);
    } else {
      console.log('team.html file created successfully!');
    }
  });
}

promptManager();
