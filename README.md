# Axioned-Node Starter Repo

### Getting Started
The node-starter repo comes bundled with an express server, swagger documentation, file/folder structure, file watcher (nodemon) jest testing suite, dotenv, eslint & husky.

## Learn More About Folder Structure :
```
└── src
    ├── index.js (Main entry file)
    ├── controller (Only Business logic)
    │   └── [Model]Controller.js
    ├── entity (Database models)
    │   └── [ModelName].js
    ├── helpers
    │    └── [HelperFunctionName].js
    ├── middleware
    │   └── index.js
    ├── repository (Only Database operations)
    │   └── [Model]Respositry.js 
    ├── routes
    │   └── [Model]Route.js
    ├── tests
    │   └── [IndividualTests].js
    
```

* Change node & npm version with require version of the project.
* Run npm install to install project dependencies.
* Add require vs code extensions as below.
  * SonarLint
  * Prettier - Code formatter
  * GitLens — Git supercharged
  * Git History

## Installation Guide

**Nodejs:** [Download](https://nodejs.org/en/download/)
_version:-_ `>=14.x.x <=17.x.x`

### Develpment Setup
1. Clone the repository and install dependencies
   ```
   $ git clone https://github.com/prdxn-org/axioned-node-starter.git
   ```

2. Install node dependencies
   ```
   $ npm install
   ```
3. Create a _.env_ file which can be referenced from _.env.example_ and provide environment variables.

4. Start the application
   ```
   $ npm run develop
   ```
5. Run tests
   ```
   $ npm run test
   ```
6. Run lint checks
   ```
   $ npm run lint
   ```