# loopback-example-angular

```
git clone https://github.com/strongloop/loopback-example-angular.git
cd loopback-example-angular
npm install
bower install
slc run
```

In this example, we create a simple "todo" list app that uses LoopBack on the
server side and AngularJS on the client side.

## Prerequisites

### Tutorials

- [Getting started with LoopBack](https://github.com/strongloop/loopback-getting-started)
- [Tutorial series, step 1](https://github.com/strongloop/loopback-example#the-basics)

### Knowledge of

- [Angular](https://angularjs.org/)
- [Angular Resource](https://docs.angularjs.org/api/ngResource/service/$resource)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
- [Bootstrap](http://getbootstrap.com/)
- [Bower](http://bower.io/)
- [LoopBack](http://loopback.io/)
- [LoopBack AngularJS SDK](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK)
- [LoopBack models](http://docs.strongloop.com/display/LB/Defining+models)
- [LoopBack middleware](http://docs.strongloop.com/display/LB/Defining+middleware)

## Procedure

### Create the app

#### App info

- Name: `loopback-example-angular`
- Directory to contain the project: `loopback-example-angular`

```
slc loopback loopback-example-angular
... # follow the prompts
cd loopback-example-angular
```

### Create the `Todo` model

#### Model information

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

### Configure the vendor directory

In the project root, create [`.bowerrc`](/.bowerrc).

>Bower installs packages in `bower_components` by default, but we reconfigure
this to `client/vendor` to make [importing files into `index.html`](/client/index.html#L33-L37)
more convenient.

### Install client side dependencies

From the project root, run:

```
bower install angular angular-resource angular-ui-router bootstrap
```

### Create the home page

Create [`index.html`](/client/index.html) in the [`client`](/client) directory.

### Create the main stylesheet

Create a [`css` directory](/client/css) to store stylesheets.

```
mkdir client/css
```

In this directory, create [`styles.css`](/client/css/styles.css).

### Serve static assets from the `client` directory

Delete [`/server/boot/root.js`](/server/boot/root.js).

Ensure that no routes from slc loopback are installed in /server/boot eg root.js. 

Remove the contents of [`routes`](/server/middleware.json#L14-L15) property (if present) and
add static middleware to the [`files`](/server/middleware.json#L17-L19) section
in [`middleware.json`](/server/middleware.json).

### Create `app.js`

Create a [`js` directory](/client/js) to hold scripts files.

```
mkdir client/js
```

In this directory, create [`app.js`](/client/js/app.js).

>Notice we declare [`lbServices`](/client/js/app.js#L3) as a dependency. We
will generate this file using the `lb-ng` command in a later step.

### Create `todo.html`

Create a [`views`](/client/views) to store view templates.

```
mkdir client/views
```

In this directory, create [`todo.html`](/client/views/todo.html).

### Create `controllers.js`

Create a [`controllers`](/client/js/controllers) directory to store controller
files.

```
mkdir client/js/controllers
```

In this directory, create [`todo.js`](/client/js/controllers/todo.js).

### Generate `lb-services.js`

Create a [`services` directory](/client/js/services) to store service files.

```
mkdir client/js/services
```

`lb-ng` is automatically installed along with the `slc` command line tool (ie.
when you ran `npm install -g strongloop`). `lb-ng` takes two arguments, the
first is the path to [`server.js`](/server/server.js) and the second is the path
to the generated services file. [`lb-services.js`](/client/js/services/lb-services.js)
is an Angular service used to interact with LoopBack models.

Create [`lb-services.js`](/client/js/services/lb-services.js) using the `lb-ng`
command.

```
lb-ng server/server.js client/js/services/lb-services.js
```

### Run the application

From the project root, enter `slc run` and browse to
[`localhost:3000`][localhost] to view the application.

---

[Other LoopBack examples][loopback-example]

[localhost]: http://localhost:3000
[loopback-example]: https://github.com/strongloop/loopback-example
