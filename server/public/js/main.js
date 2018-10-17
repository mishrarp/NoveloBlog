var webShaala = angular.module("webShaala",['ngRoute','restangular']);

webShaala.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
   // RestangularProvider.setBaseUrl('http://localhost:3030/articals');
	$locationProvider.html5Mode(true);
	$routeProvider
	// route for the home page
	 .when('/home', {
         templateUrl : 'view/home/Home.html',
         controller  : 'homeController'
    })
    .when('/linux', {
         templateUrl : 'view/linux/Linux.html',
        // controller  : 'linuxController'
    })
    .when('/mac', {
         templateUrl : 'view/mac/Mac.html',
         //controller  : 'macController'
    })	
    .when('/windows', {
         templateUrl : 'view/windows/Windows.html',
         //controller  : 'windowsController'
    })
    .when('/freesoft', {
         templateUrl : 'view/freesoft/Freesoft.html',
         //controller  : 'freesoftController'
    })
    .when('/download', {
         templateUrl : 'view/download/Download.html',
         //controller  : 'downloadController'
    })
    .when('/artical', {
         templateUrl : 'view/artical/artical.html',
        controller  : 'articalController'
    })
    .otherwise({
        redirectTo: '/home'
      });	
}]);

webShaala.config(function(RestangularProvider){
	RestangularProvider.setBaseUrl('http://localhost:3030/api');
});

// factory Services

webShaala.factory('PagerService',function(){
    
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 2;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 1) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    
});

//webShaala.factory('ArticalRestangular', function(Restangular) {
//  return Restangular.withConfig(function(RestangularConfigurer) {
//    RestangularConfigurer.setRestangularFields({
//      id: '_id'
//    });
//  });
//}).factory('Artical', function(ArticalRestangular) {
//  return ArticalRestangular.service('artical');
//});

// Directive create
webShaala.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:145px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               console.log(newVal);
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});

webShaala.service('productService', function() {
  var productList = [];
    
  var addProduct = function(newObj) {
      productList.shift();
      productList.push(newObj);
  };

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});
