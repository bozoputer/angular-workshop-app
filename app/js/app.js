// Define our app module
var app = angular.module('ngWorkshop', ['ui.router']);

// Application Config
app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('storefront', {
    url: '/',
    controller: 'StoreFrontController',
    templateUrl: 'templates/store.html'
  });

  $stateProvider.state('addProduct', {
    url: '/add',
    controller: 'AddProductController',
    templateUrl: 'templates/add.html'
  });

  $stateProvider.state('cart', {
    url: '/cart',
    controller: 'CartController',
    templateUrl: 'templates/cart.html'
  });

});

// Cart controller
app.controller('CartController', function ($scope, CartService) {

  $scope.cartItems = CartService.getCartContents();
  $scope.totalPrice = CartService.subTotal();

});


// Add Product Controller
app.controller('AddProductController', function ($scope, $http) {

  var url = 'http://workshop-server.herokuapp.com/collections/timwasdf44asdfasdf';

  $scope.message = '';

  $scope.addProduct = function (product) {
    $http.post(url, product).then( function (res) {
      $scope.product = {};
      $scope.message = res.data.name + ' has been addeded!';
    });
  };


});

// Store Front Controller
app.controller('StoreFrontController', function ($scope, $http, CartService) {

  var url = 'http://workshop-server.herokuapp.com/collections/timwasdf44asdfasdf';

  $scope.cartMessage = '';
  $scope.ticker = CartService.getCartContents().length;

  $http.get(url).then( function (res) {
    $scope.products = res.data;
  });

  $scope.addCart = function (product) {
    CartService.addItemToCart(product);
    $scope.cartMessage = product.name + ' added!';
    $scope.ticker = CartService.getCartContents().length;
  };

});


// Shopping cart service
app.service('CartService', function () {

  var cart = [];

  var inCart = function (item) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i] === item) {
        return true;
      }
    }
    return false;
  };

  this.subTotal = function () {
    var subTotal = 0;
    cart.forEach( function (item) {
      subTotal += (item.qty * item.price);
    });
    return subTotal;
  };

  this.getCartContents = function () {
    return cart;
  };

  this.addItemToCart = function (item) {
    if (inCart(item)) {
      item.qty++;
    } else {
      item.qty = 1;
      cart.push(item);
    }
  };

});
