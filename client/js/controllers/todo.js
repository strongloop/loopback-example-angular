angular
  .module('app')
  .controller('TodoController', ['$scope', '$state', 'Todo', function($scope,
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
          $('.focus').focus();
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
