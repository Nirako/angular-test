(function() {
  angular.module('ProviderApp', [])
  .controller('AddProduct', AddProductController)
  .controller('ShowProduct', ShowProductController)
  .provider('ProductService', ProductProvider);
  ;

  AddProductController.$inject = ['ProductService'];
  function AddProductController() {

  }

  ShowProductController.$inject = ['ProductService'];
  function ShowProductController() {

  }

  function ProductService() {
    var service = this;
  }

  function ProductProvider() {
    var provider = this;

    provider.$get = function() {
      return new ProductService();
    };
  }
})();
