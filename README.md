# loopback-example-angular

```
git clone https://github.com/strongloop/loopback-example-angular.git
cd loopback-example-angular
npm install
slc run # then browse to localhost:3000
```

In this example, we create a simple todo list app that uses LoopBack on the
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

### 1. Create the app

#### App info

- Name: `loopback-example-angular`
- Directory to contain the project: `loopback-example-angular`

```
slc loopback loopback-example-angular
... # follow the prompts
cd loopback-example-angular
```

### 2. Create the `Todo` model

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

### 3. Configure the vendor directory

In the project root, create [`.bowerrc`](/.bowerrc).

>Bower installs packages in `bower_components` by default, but we reconfigure
this to `client/vendor` to make [importing files into `index.html`](/client/index.html#L33-L37)
more convenient.

### 4. Install client side dependencies

From the project root, run:

```
bower install angular angular-resource angular-ui-router bootstrap
```

### 5. Create the home page

Create [`index.html`](/client/index.html) in the [`client`](/client) directory.

### 6. Create the main stylesheet

Create a [`css` directory](/client/css) to store stylesheets.

```
mkdir client/css
```

In this directory, create [`styles.css`](/client/css/styles.css).

### 7. Serve static assets from the `client` directory

Delete `/server/boot/root.js`.

Add static middleware to the [`files` section in `middleware.json`](/server/middleware.json#L23-L27)
.

### 8. Create `app.js`

Create a [`js` directory](/client/js) to hold scripts files.

```
mkdir client/js
```

In this directory, create [`app.js`](/client/js/app.js).

>Notice we declare [`lbServices`](/client/js/app.js#L3) as a dependency. We
will generate this file using the `lb-ng` command in a later step.

### 9. Create `todo.html`

Create a [`views`](/client/views) to store view templates.

```
mkdir client/views
```

In this directory, create [`todo.html`](/client/views/todo.html).

### 10. Create `controllers.js`

Create a [`controllers`](/client/js/controllers) directory to store controller
files.

```
mkdir client/js/controllers
```

In this directory, create [`todo.js`](/client/js/controllers/todo.js).

### 11. Generate `lb-services.js`

Create a [`services` directory](/client/js/services) to store service files.

```
mkdir client/js/services
```

`lb-ng` is automatically installed along with the `slc` command line tool (ie.
when you ran `npm install -g strongloop`). `lb-ng` takes two arguments, the
first is the path to [`server.js`](/server/server.js) and the second is the path
to the [generated services file](https://github.com/strongloop/loopback-example-angular/blob/master/client/js/services/lb-services.js).
[`lb-services.js`](/client/js/services/lb-services.js) is an Angular service
used to interact with LoopBack models.

Create [`lb-services.js`](/client/js/services/lb-services.js) using the `lb-ng`
command.

```
lb-ng server/server.js client/js/services/lb-services.js
```

### 12. Run the application

From the project root, enter `slc run` and browse to [`localhost:3000`](http://localhost:3000)
to view the application.

---

[Other LoopBack examples](https://github.com/strongloop/loopback-example)
