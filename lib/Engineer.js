const Employee = require('./Employee');

// Child class: Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getRole() {
    return 'Engineer';
  }

  getGithub() {
    return this.github;
  }
}
module.exports = Engineer;
