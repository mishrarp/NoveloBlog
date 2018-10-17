webShaala.controller('homeController', function($scope,$rootScope,$http,productService,Restangular,PagerService){
    
    var _init = function(){
        setTop(); 
    }
    _init();
	var baseAccounts = Restangular.all('articals');
	$scope.articalData = baseAccounts.getList().$object;
//	var newAccount = {
//			title: "How to Install diffmerge on mac book air .",
//			topic: "learning",
//			content: "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis",
//			topic_url: "http://novelo-blog-soratemplates.blogspot.in/2015/03/papilion-minter-savior_4.html",
//			topic_img: "https://3.bp.blogspot.com/-kM7cfMQLh58/V46zhuS9mhI/AAAAAAAAIeQ/AudmlirQ9r0tFox_GFlFQtQNPs22On_WwCLcB/s1600/l4-750x501.jpg",
//			topic_video: "https://www.youtube.com/watch?v=OhPFgqHz68o",
//			topic_video_length: "120",
//			author: "Raghvendra Mishra",
//			views: "20",
//			comment: "nice tutorial and video"
//	};	
//	
//	baseAccounts.post(newAccount);
  
//    $http.get('articals.json')
//       .then(function(res){
//          console.log("succes");
//          $scope.articalData = res.data;                
//        });
    
    $scope.articalPage = function($event,i){
        $scope.artical = angular.copy($scope.articalData[i]);//findTemplateById(id);
        productService.addProduct($scope.artical);
        setTop(); 
        console.log(' data '+JSON.stringify($scope.artical,null," "));
       // $rootScope.ishomelink = true;
    };
    
        var vm ={}; //= this;

        //vm.dummyItems = _.range(1, 151); // dummy array of items to be paged
        vm.pager = {};
        vm.setPage = setPage;

        initController();

        function initController() {
            // initialize to page 1
            vm.setPage(1);
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = PagerService.GetPager($scope.articalData.length, page);

            // get current page of items
            vm.items = $scope.articalData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
});
