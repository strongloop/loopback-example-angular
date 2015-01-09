#loopback-example-angular

```
git clone git@github.com:strongloop/loopback-example-angular.git
cd loopback-example-angular
npm install
slc run
```

In this example, we create a "todo" list application that uses [LoopBack][1]
on the server side and [AngularJS][2] on the client side.

- [Prerequisites](#prerequisites)
- [Procedure](#procedure)
  - [1. Create the application](#1-create-the-application)
  - [2. Create the `Todo` model](#2-create-the-todo-model)
  - [3. Store the memory connector data in a JSON file](#3-store-memory-connector-data-in-a-json-file)
  - [4. Add a sample model instance](#4-add-a-sample-model-instance)
  - [5. Configure the vendor directory](#5-configure-the-vendor-directory)
  - [6. Install client side dependencies](#6-install-client-side-dependencies)
  - [7. Create the main page](#7-create-the-main-page)
  - [8. Create the main stylesheet](#8-create-the-main-stylesheet)
  - [9. Serve static assets from the `client` directory](#9-serve-static-assets-from-the-client-directory)
  - [10. Create `app.js`](#10-create-appjs)
  - [11. Create `todo.html`](#11-create-todohtml)
  - [12. Create `controllers.js`](#12-create-controllersjs)
  - [13. Generate `lb-services.js`](#13-generate-lb-servicesjs)
  - [14. Run the application](#14-run-the-application)
  - [15. Conclusion](#15-conclusion)

##Prerequisites

###Tutorials

- [Getting started with LoopBack][3]
- [Tutorial series - Step 1][4]

###Knowledge

- [Angular][5]
- [Angular Resource][6]
- [AngularUI Router][7]
- [Bootstrap][8]
- [Bower][9]
- [LoopBack AngularJS SDK][10]
- [LoopBack models][11]
- [LoopBack middleware][12]

##Procedure

###1. Create the application

####Application information

- Name: `loopback-example-angular`
- Directory to contain the project: `loopback-example-angular`

```
slc loopback loopback-example-angular
... # follow the prompts
cd loopback-example-angular
```

###2. Create the `Todo` model

####Model information

- Name: `Todo`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `content`
      - String
      - Required

```
slc loopback:model Todo
... # follow the prompts
```

###3. Store memory connector data in a JSON file

Add the [`file` property](/server/datasources.json#L5) to
[`datasources.json`](/server/datasources.json).

> This property tells the memory connector to persist data into a file at the
> path we specify.

###4. Add a sample model instance

Add a "todo" instance using the
[API explorer](http://docs.strongloop.com/display/LB/Use+API+Explorer).

> To use the API explorer, start the server via `slc run` and browse to
> `localhost:3000/explorer`.

Use the `PUT /Todos` option and insert the following value:

```
{
  "content": "Buy eggs"
}
```

###5. Configure the vendor directory

In the project root, create [`.bowerrc`](/.bowerrc).

> Bower installs packages in `bower_components` by default, but we reconfigure
> this to `client/vendor` instead to make [importing files into
> `index.html`](/client/index.html#L33-L37) more convenient.

###6. Install client side dependencies

From the project root, run:

```
bower install angular angular-resource angular-ui-router bootstrap
```

###7. Create the main page

Create [`index.html`](/client/index.html) in the [`client`](/client) directory.

###8. Create the main stylesheet

Create a [`css` directory](/client/css) to store stylesheets.

```
mkdir client/css
```

In this directory, create [`styles.css`](/client/css/styles.css).

###9. Serve static assets from the `client` directory

Remove the contents of [`routes`](/server/middleware.json#L14-L15) property and
add static middleware to the [`files`](/server/middleware.json#L17-L19) section
in [`middleware.json`](/server/middleware.json).

###10. Create `app.js`

Create a [`js` directory](/client/js) to hold scripts files.

```
mkdir client/js
```

In this directory, create [`app.js`](/client/js/app.js).

> Notice we declare [`lbServices`](/client/js/app.js#L3) as a dependency. We
> will generate this file using the `lb-ng` command in a later step.

###11. Create `todo.html`

Create a [`views`](/client/views) to store view templates.

```
mkdir client/views
```

In this directory, create [`todo.html`](/client/views/todo.html).

###12. Create `controllers.js`

Create a [`controllers`](/client/js/controllers) directory to store our controller
files.

```
mkdir client/js/controllers
```

In this directory, create [`todo.js`](/client/js/controllers/todo.js).

###13. Generate `lb-services.js`

Create a [`services` directory](/client/js/services) to store service files.

```
mkdir client/js/services
```

Create [`lb-services.js`](/client/js/services/lb-services.js) using the
`lb-ng` command.

> `lb-ng` is automatically installed along with the `slc` command line tool (ie.
> when you ran `npm install -g strongloop`).

> [`lb-services.js`](/client/js/services/lb-services.js) is an Angular service
> used to interact with LoopBack models.

```
lb-ng server/server.js client/js/services/lb-services.js
```

> `lb-ng` takes two arguments, the first argument is the path to
> [`server.js`](/server/server.js) and the second argument is the path to the
> generated service file.

###14. Run the application

From the project root, enter `slc run` and browse to
[`localhost:3000`][localhost] to view the application.

###15. Conclusion

You've successfully built a simple Angular "todo" application with LoopBack. For
more information, see the [official LoopBack Angular SDK documentation][10].

---

- [All tutorials][all-tutorials]

[all-tutorials]: https://github.com/strongloop/loopback-example
[localhost]: http://localhost:3000

[1]: http://loopback.io/
[2]: https://angularjs.org/
[3]: https://github.com/strongloop/loopback-getting-started
[4]: https://github.com/strongloop/loopback-example#step-1
[5]: https://angularjs.org/
[6]: https://docs.angularjs.org/api/ngResource/service/$resource
[7]: https://github.com/angular-ui/ui-router
[8]: http://getbootstrap.com/
[9]: http://bower.io/
[10]: http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK
[11]: http://docs.strongloop.com/display/LB/Defining+models
[12]: http://docs.strongloop.com/display/LB/Defining+middleware
