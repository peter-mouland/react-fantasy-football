// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
const { findRoute } = require('../../../src/app/routes');

const commands = {
  login: function(email, password) {
    // this.api.pause(1000);
    return this.section.main.waitForElementVisible('@emailInput', 1000)
      .setValue('@emailInput', email)
      .setValue('@passwordInput', password)
      .click('@actionLoginInput')
      .click('@submitButton')
  },
  signUp: function(email, password) {
    // this.api.pause(1000);
    return this.section.main.waitForElementVisible('@emailInput', 1000)
      .setValue('@emailInput', email)
      .setValue('@passwordInput', password)
      .click('@actionSignUpInput')
      .click('@submitButton')
  },
  thenDisplays: function(element) {
    return this.section.main
      .waitForElementPresent(element, 1000)
      .assert.visible(element);
  }
};


module.exports = {

  url: function () {
    return findRoute('login').path;
  },

  commands: [commands],

  elements: [{
    main: "#login-page"
  }],

  sections: {

    main: {

      selector: '#login-page',
      locateStrategy: 'css selector',

      elements: [{
        error: '.form__error',
        submitButton: 'input[type=submit]',
        emailInput: 'input[type=email]',
        passwordInput: 'input[type=password]',
        actionInput: 'input[name=action]',
        actionLoginInput: 'input[value=login]',
        actionSignUpInput: 'input[value=signUp]',
      }]
    }
  }
};
