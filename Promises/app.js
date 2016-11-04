(function() {
  'use strict'
  angular.module('ProviderApp', [])
  .controller('AddProduct', AddProductController)
  .controller('ShowProduct', ShowProductController)
  .filter('reverse', reverseNumberFilter)
  .service('ProductService', ProductService)
  ;

  AddProductController.$inject = ['ProductService', 'reverseFilter'];
  function AddProductController(ProductService, reverseFilter) {
    var aP = this;
    aP.product = {product:'Test', price:1234};

    aP.buy = function() {
      ProductService.addToList(aP.product);
      aP.product = {product:'', price:''};
  }
}

  ShowProductController.$inject = ['ProductService'];
  function ShowProductController(ProductService) {
    var sP = this;

    sP.getItemsList = function() {
      return ProductService.getItemsList();
    }
  }

  ProductService.$inject = ['$q', '$timeout'];
  function ProductService($q , $timeout) {
    var service = this;
    var listItems = [];

    service.addToList = function(product) {
      var promise = service.validateProduct(product);
      promise.then(function(productValidated) {
        listItems.push(product);
        console.log(product.product+"('"+product.price+"') had introduced to the items list !");
      }, function (reason) {
        throw reason;
      });
    }

    service.validateProduct = function(product) {
      var differed = $q.defer();
      $timeout(function () {
        if(product.product.length == 0 || isNaN(product.price)) {
          differed.reject("The product is not correct !");
        }
        else
          differed.resolve(product);
      }, 2000);
      return differed.promise;
    }

    service.getItemsList = function() {
      return listItems;
    }
  }

  function ProductProvider() {
    var provider = this;

    provider.$get = function() {
      return new ProductService();
    };
  }

  function reverseNumberFilter() {
    return function(input) {
          var reverse = '';
          if(!isNaN(input)) {
            var stringNumber = ""+input;
            for(var i=(stringNumber.length)-1;i>=0;i--) {
              reverse += stringNumber[i];
            }
          }
          else
            reverse = 0;
          return reverse;
    }
  }


})();
