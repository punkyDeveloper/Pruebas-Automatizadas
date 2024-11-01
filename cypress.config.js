const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = defineConfig({
  experimentalMemoryManagement: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: { "specPattern": "**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
