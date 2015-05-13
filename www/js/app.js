angular.module('starter', ['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('intro',{
			url:'/',
			templateUrl:'templates/intro.html',
			controller:'IntroCtrl'
		})
		.state('app',{
			url:'/app',
			abstract:true,
			templateUrl:'templates/menu.html',
			controller:'MenuCtrl'
		})
		.state('app.home',{
			url:'/home',
			views:{
				'menuHome':{
					templateUrl:'templates/home.html',
					controller:'HomeCtrl'
				}
			}
		});
	$urlRouterProvider.otherwise('/');
});
