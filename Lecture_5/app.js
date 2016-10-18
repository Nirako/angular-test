(function() {
  'use strict';
  var htmlModule = angular.module('myFirstApp', [])
  htmlModule.controller('MyFirstController', function($scope) {
    var person = {};
    person.familyName = "GONCALVES";
    person.name = "Antonio";
    person.age = 86;
    person.birthDate = 1986;
    $scope.person = person;
    $scope.name = "Yakoov";
    var date = new Date();
    var stringDate = date.getDay()+"/"+date.getMonth()+"/"+date.getYear();
    $scope.time = stringDate;
  });
})();
