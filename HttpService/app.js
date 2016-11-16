(function() {
  'use strict';
  angular.module('HttpApp', [])
  .controller('controllerApp', Controller)
  .service('service', ServiceApp)
  .service('ForeignService', ForeignService)
  .constant('URLService', 'http://192.168.1.13/App/REST/')
  .constant('ForeignURL', 'https://davids-restaurant.herokuapp.com/categories.json')
  ;

  Controller.$inject = ['service', 'ForeignService'];
  function Controller(service, ForeignService) {
    var ctrl = this;
    var promise = ForeignService.getListPersonne();
    promise.then(function(response) {
      ctrl.listPersonne = response.data;
    }).catch(function (error) {
      console.log(error);
    });

  }

//LOCAL SERVICE
  ServiceApp.$inject = ['$http', 'URLService'];
  function ServiceApp($http, URLService) {
    this.getListPersonne = function() {
      return $http({method : 'GET', url : URLService+'MainService'})
    }
  }

//REMOTE SERVICE
  ForeignService.$inject = ['$http', 'ForeignURL'];
  function ForeignService($http, ForeignURL) {
    this.getListPersonne = function() {
      return $http({method : 'GET', url : ForeignURL})
    }
  }
})();
