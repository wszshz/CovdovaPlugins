angular.module('starter.services', [])
.factory('ServerData',function($ionicPopup){
	return{
		//弹出信息框
		alert:function(msg){
			$ionicPopup.alert({
				template: msg,
				title: '提示信息'
			});
		}
	};
});
