(function() {
  angular.module('ProviderApp', [])
  .controller('AddProduct', AddProductController)
  .controller('ShowProduct', ShowProductController)
  .filter('reverse', reverseNumberFilter)
  .provider('ProductService', ProductProvider)
  ;

  AddProductController.$inject = ['ProductService', 'reverseFilter'];
  function AddProductController(ProductService, reverseFilter) {
    var aP = this;
    aP.product = {product:'', price:''};

    aP.buy = function() {
      aP.product.price = reverseFilter(aP.product.price);
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

  function ProductService() {
    var service = this;
    var listItems = [];

    service.addToList = function(product) {
      listItems.push(product);
      console.log(product.product+"('"+product.price+"') had introduced to the items list !");
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
