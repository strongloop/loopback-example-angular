angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      });

    $urlRouterProvider.otherwise('todo');
  }])
  .run([
    '$rootScope', 'LoopBackAuth', 'User',
    function($rootScope, LoopBackAuth, User) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        //var currentUserId = LoopBackAuth.load('currentUserId');
        //console.log('Current User id', currentUserId);
        console.log('Authenticated?', User.isAuthenticated());
        console.log('Current User id', User.getCurrentId());
      });
    }
  ]);
