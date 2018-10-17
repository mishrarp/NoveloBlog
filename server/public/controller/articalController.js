webShaala.controller('articalController', function($scope,$http,productService,Restangular){
    var baseAccounts = Restangular.all('articals');
	
	$scope.articalData = baseAccounts.getList().$object;
	
//    $http.get('articals.json')
//       .then(function(res){
//          console.log("succes");
//          $scope.articalData = res.data;                
//        });

   $scope.articalOne = productService.getProducts();
    
   $scope.articalPage = function($event,i){
        $scope.artical = angular.copy($scope.articalData[i]);//findTemplateById(id);
        productService.addProduct($scope.artical);
        setTop();
        console.log(' data '+JSON.stringify($scope.artical,null," "));
    };
    
});
