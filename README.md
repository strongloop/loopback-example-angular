#loopback-example-angular

A simple "To Do" list application that uses [LoopBack][1] on the back end and
[AngularJS][2] on the front end.

```
git clone https://github.com/strongloop/loopback-example-angular
cd loopback-example-angular
npm install
slc run
```

- [Prerequisites](#prerequisites)
- [Procedure](#procedure)
  - [1. Create the application](#1-create-the-loopback-application)
  - [2. Install the connector](#2-install-the-connector)
  - [3. Configure the datasource](#3-configure-the-datasource)
  - [4. Add a model](#4-add-a-model)
  - [5. Add a script to migrate data](#5-add-a-script-to-migrate-data)
  - [6. Add a script to discover a schema](#6-add-a-script-to-discover-a-schema)
  - [7. Add a script to discover and build models](#7-add-a-script-to-discover-and-build-models)
  - [8. Conclusion](#8-conclusion)

##Prerequisites

- Try [Getting started with LoopBack][3]
- Read [Getting started with LoopBack][4]

Install [Bower](http://bower.io/) to manage front-end dependencies:

`npm install -g bower`

In addition, you will need a basic understanding of:

- Angular
- Angular Resource
- AngularUI Router
- Bootstrap
- Bower
- [LoopBack models]()

##Procedure


1. **Create the application**.

  Run `slc loopback`, and name the app `loopback-example-angular-starter`.

2. **Configure db.json.**

  Edit `server/datasources.json` to look like:
  ```json
  {
    "db": {
      ...
      "file": "db.json"
    }
  }
  ```
  >This change will persist model instances to a JSON file. For more information, see the [memory connector documentation](http://docs.strongloop.com/display/LB/Memory+connector#Memoryconnector-Datapersistance).

3. **Create the Todo model.**

  Run `slc loopback:model Todo` to create the Todo model. Use the memory connector, expose the model via REST, leave the default plural form and add a required String property called "content".

4. **Add a sample model.**

  Run `slc run` to start the server, go to [localhost:3000/explorer](http://localhost:3000/explorer) and add a *Todo* instance with the following data:

  ```json
  {
    "content": "Buy eggs"
  }
  ```

  Verify that model has been inserted by opening `db.json` (it will be created where you ran `slc run`). You should see this:

  ```json
  {
    "ids": {
      "User": 1,
      "AccessToken": 1,
      "ACL": 1,
      "RoleMapping": 1,
      "Role": 1,
      "Todo": 2
    },
    "models": {
      "User": {},
      "AccessToken": {},
      "ACL": {},
      "RoleMapping": {},
      "Role": {},
      "Todo": {
        "1": "{\"content\":\"Buy eggs\",\"id\":1}"
      }
    }
  }
  ```

  >Notice the "Todo" property contains the model you just created.

5. **Configure the vendor directory.**

  Create `.bowerrc` in the project root with the following contents:

  ```json
  {
    "directory": "client/vendor"
  }
  ```

  >Bower installs packages in `bower_components` by default, but we reconfigure this to `client/vendor` instead to make it easier to import files into `index.html`.

6. **Install front-end dependencies.**

  Run the `bower install angular angular-resource angular-ui-router bootstrap` from the project root.

7. **Create index.html**

  In the `client` directory with the following contents:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap 101 Template</title>

      <!-- Bootstrap -->
      <link href="css/bootstrap.min.css" rel="stylesheet">

      <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
      <h1>Hello, world!</h1>

      <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="js/bootstrap.min.js"></script>
    </body>
  </html>
  ```

  >This is just the basic [Bootstrap getting started template](http://getbootstrap.com/getting-started/).

8. **Create style.css.**

  Create a `css` directory inside the `client` directory. Inside the newly created directory, create a file named `style.css` with the following contents:

  ```css
  body {
    padding-top:50px;
  }
  .glyphicon-remove:hover {
    cursor:pointer;
  }
  ```

9. **Add bower dependencies to index.html.**

  Modify `index.html` to look like:

  ```html
  ...
  <title>LoopBack Angular starter example</title>
  ...
  <body ng-app="app">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">LoopBack Angular starter example</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div ui-view></div>
    </div>

    <script src="vendor/jquery/dist/jquery.js"></script>
    <script src="vendor/bootstrap/dist/js/bootstrap.js"></script>
    <script src="vendor/angular/angular.js"></script>
    <script src="vendor/angular-resource/angular-resource.js"></script>
    <script src="vendor/angular-ui-router/release/angular-ui-router.js"></script>
  </body>
  ```

  >Use the minified versions of Bower dependencies for your production app.

10. **Configure index.html to be the application entry point.**

  Remove `server/boot/root.js` and modify `server/server.js` to look like:

  ```js
  ...
  // -- Mount static files here--
  // All static middleware should be registered at the end, as all requests
  // passing the static middleware are hitting the file system
  // Example:
  var path = require('path');
  app.use(loopback.static(path.resolve(__dirname, '../client')));
  ...
  ```

11. **Create app.js and configure application routes.**

  In the `client` directory, create another directory named `js`. Inside the `js` directory, create a file named `app.js` with the following contents:

  ```js
  'use strict';

  angular
    .module('app', [
      'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
        $urlRouterProvider) {
      $stateProvider
        .state('todo', {
          url: '',
          templateUrl: 'js/todo/templates/todo.html',
          controller: 'TodoCtrl'
        });
      $urlRouterProvider.otherwise('todo');
    }]);
  ```

  >For more information on application routing, see [AngularUI Router documentation](https://github.com/angular-ui/ui-router).

  >If you're using `jshint`, you can add `"predef": ["angular"]` to `.jshintrc` to prevent Angular specific warnings.

  Then add `apps.js` as a dependency in `index.html`:

  ```html
  ...
  <script src="vendor/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="js/app.js"></script>
  ...
  ```

12. **Create todo.html.**

  In `client/js`, create a directory named `todo`. Inside the `todo` directory, create another directory named `templates`. In the `templates` directory, create a file named `todo.html` with the following contents:

  ```html
  <h1>Todo list</h1>
  <hr>
  <form name="todoForm" novalidate ng-submit="addTodo()">
    <div class="form-group"
        ng-class="{'has-error': todoForm.content.$invalid
          && todoForm.content.$dirty}">
      <input type="text" class="form-control focus" name="content"
          placeholder="Content" autocomplete="off" required
          ng-model="newTodo.content">
      <span class="has-error control-label" ng-show="
          todoForm.content.$invalid && todoForm.content.$dirty">
        Content is required.
      </span>
    </div>
    <button class="btn btn-default" ng-disabled="todoForm.$invalid">Add</button>
  </form>
  <hr>
  <div class="list-group">
    <a class="list-group-item" ng-repeat="todo in todos">{{todo.content}}&nbsp;
      <i class="glyphicon glyphicon-remove pull-right"
          ng-click="removeTodo(todo)"></i></a>
  </div>
  ```

13. **Create controllers.js.**

  In `client/js/todo`, create `controllers.js` with the following contents:

  ```js
  'use strict';

  angular
    .module('app')
    .controller('TodoCtrl', ['$scope', '$state', 'Todo', function($scope,
        $state, Todo) {
      $scope.todos = [];
      function getTodos() {
        Todo
          .find()
          .$promise
          .then(function(results) {
            $scope.todos = results;
          });
      }
      getTodos();

      $scope.addTodo = function() {
        Todo
          .create($scope.newTodo)
          .$promise
          .then(function(todo) {
            $scope.newTodo = '';
            $scope.todoForm.content.$setPristine();
            $('.focus').focus(); //JQuery hack for refocusing text input
            getTodos();
          });
      };

      $scope.removeTodo = function(item) {
        Todo
          .deleteById(item)
          .$promise
          .then(function() {
            getTodos();
          });
      };
    }]);
  ```

  >If you know a better way to refocus a text input using purely Angular
  >(instead of the JQuery hack above), submit a pull request please. ;)

  Then add `controllers.js` as a dependency in `index.html`:

  ```html
  ...
  <script src="js/app.js"></script>
  <script src="js/todo/controllers.js"></script>
  ...
  ```

14. **Generate lb-services.js.**

  Create a new directory named `common` in `client/js`. Switch to the `common` directory and run:

  ```
  lb-ng ../../../server/server.js lb-services.js
  ```

  >This generates a file named `lb-services.js` which is an Angular service used to interface with your back-end server. For more information, see the [LoopBack AngularJS SDK](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-Setup).

  Next, declare `lbServices` as a dependency in `client/js/app.js`:

  ```js
  ...
  angular
    .module('app', [
      'lbServices',
      'ui.router'
    ])
    ...
  ```

  Then add `lb-services.js` as a dependency in `index.html`:

  ```html
  ...
  <script src="js/common/lb-services.js"></script>
  ...
  ```

15. **Run the application.**

  From the project root, enter `slc run` and browse to [localhost:3000](http://localhost:3000) to view the application.

#Notes
- [Build automation](http://en.wikipedia.org/wiki/Build_automation) is purposely left out in this example to things simple
- For real world applications, we recommend using a build system such as [gulp](http://gulpjs.com/) or [grunt](http://gruntjs.com/)
- See [loopback-faq-build-automation](https://github.com/strongloop/loopback-faq-build-automation)

#More information
For more information, see the [LoopBack Angular SDK documentation](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK).

[1]: http://loopback.io
[2]: http://angularjs.org/
[3]: http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack
[4]: http://docs.strongloop.com/display/LB/Working+with+models
