angular.module('starter.controllers', [])
//引导页
.controller('IntroCtrl',function($scope,$state,$location){
	var startApp = function() {
	    $location.path('/app/home').replace();	//不能再后退回引导页
  	};
  	
	// 向导页面只显示一次
	var firstInit=function(){
		if(fz.storage.get('didIntro') === "true") {
		    console.log('Skip intro');
		    startApp();
		} else {
		  	fz.storage.set('didIntro') = true;
		}
	};
	//firstInit();
	
	//立即体验
	$scope.gotoHome=function(){
		startApp();
	}
})
//菜单
.controller('MenuCtrl',function(){
	
})
.controller('HomeCtrl',function($scope,$timeout,$ionicNavBarDelegate){
	// 从向导页面跳转过来的话，不显示返回按钮
	$timeout( function() {
		$ionicNavBarDelegate.showBackButton(false);
	}, 0);
});
