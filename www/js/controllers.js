angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope) {
})

.controller('HomeCtrl', function(ServerData,$rootScope,$scope,$cordovaActionSheet,$ionicActionSheet,$cordovaAdMob,$cordovaAppAvailability,$cordovaAppRate,$cordovaAppVersion,$cordovaBadge,$cordovaBackgroundGeolocation,$cordovaBatteryStatus,$cordovaBarcodeScanner,$cordovaCalendar,$cordovaDatePicker,$cordovaDialogs,$cordovaToast) {
  
  //Action Sheet $cordovaActionSheet
  //该行动表插件显示的选项，用户可以从中选择一个原生纸。 iOS的使用本地UIActionSheet。 Android使用本机AlertDialog。
  //cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-actionsheet.git
  $scope.ActionSheet=function(){
  	var options = {
	    title: '标题',
	    buttonLabels: ['选择', '预览'],
	    addCancelButtonWithLabel: '取消',
	    androidEnableCancelButton : true,
	    winphoneEnableCancelButton : true,
	    addDestructiveButtonWithLabel : '删除'
	};

	document.addEventListener("deviceready", function () {
	    $cordovaActionSheet.show(options)
	      .then(function(btnIndex) {
	        var index = btnIndex;
	        ServerData.alert('index'+index);
	      });
	  	}, false);
  	};
  
  //Action Sheet Ionic自带的
  $scope.IonicActionSheet=function(){
  	var buttons = [{
		"text": "拍照"
	}, {
		"text": "选择照片"
	}];
	var actionShowOptions = {
		buttons: buttons,
		destructiveText: "删除",
		cancelText: "取消",
		buttonClicked: function(index) {
			switch (index) {
			case 0:
				photoPicker();
				break;
			case 1:
				electPhoto();
				break;
			}
			return true;
		},
		destructiveButtonClicked: function() {
			ServerData.alert('删除');
			return true;
		}
	};
	$ionicActionSheet.show(actionShowOptions);
  };
  
  //AdMob $cordovaAdMob
  //AdMob的该插件呈现AdMob的广告在移动应用/游戏本身从JavaScript。
  //cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git
  $scope.AdMob=function(){
  	// AdMob implementation here
    // coming soon...
  };
  
  //App Availability $cordovaAppAvailability
  //该AppAvailability插件允许你检查，如果一个应用程序被安装在用户的设备上。它需要一个URI方案（如微博：//）在Android上的iOS或包名称（如com.twitter.android）。
  //cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
  $scope.AppAvailability=function(){
  	document.addEventListener("deviceready", function () {
    $cordovaAppAvailability.check('twitter://')
      .then(function() {
        // is available
        ServerData.alert('available');
      }, function () {
        // not available
        ServerData.alert('not available');
      });
  }, false);
  };
  
  //App Rate $cordovaAppRate
  //该AppRate插件可以很容易地提示用户评价你的应用程序，要么没有或更高版本，或从不。
  //cordova plugin add https://github.com/pushandplay/cordova-plugin-apprate.git
  $scope.AppRate=function(){
  	document.addEventListener("deviceready", function () {
	   var prefs = {
	     language: 'en',
	     appName: 'MY APP',
	     iosURL: '<my_app_id>',
	     androidURL: 'market://details?id=<package_name>',
	     windowsURL: 'ms-windows-store:Review?name=<...>'
	   };
   	$cordovaAppRateProvider.setPreferences(prefs);
   	
   	//Open the Dialog in a controller
   	$cordovaAppRate.promptForRating(true).then(function (result) {
        // success
        ServerData.alert('成功');
    });
    
    //Navigate to the App store in a controller, bypassing the dialog box
    $cordovaAppRate.navigateToAppStore().then(function (result) {
        // success
        ServerData.alert('成功');
    });
  }, false);
  };
  
  //App Version $cordovaAppVersion
  //读您的应用程序从目标构建设置的版本。
  //cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
  $scope.AppVersion=function(){
  	document.addEventListener("deviceready", function () {
    $cordovaAppVersion.getAppVersion().then(function (version) {
        var appVersion = version;
        ServerData.alert(appVersion);
      });
  }, false);
  };
  
  //Badge $cordovaBadge
  //访问和修改各种移动平台包括iOS，Android和Windows Phone的应用程序图标的证件号码。
  //cordova plugin add https://github.com/katzer/cordova-plugin-badge.git
  $scope.Badge=function(){
  	document.addEventListener("deviceready", function () {
    $cordovaBadge.hasPermission().then(function(yes) {
	    // You have permission
	    ServerData.alert('你有许可');
	  }, function(no) {
	    // You do not have permission
	    ServerData.alert('你没有许可');
	  });
  }, false);
  };
  
  //Background Geoloc $cordovaBackgroundGeolocation
  //为科尔多瓦/ PhoneGap的跨平台的背景与地理位置电池节能“圆形区域监控”和“停止检测”。
  //cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git
  $scope.BackgroundGeoloc=function(){
  	var options = {
    // https://github.com/christocracy/cordova-plugin-background-geolocation#config
  	};
  document.addEventListener("deviceready", function () {
    // `configure` calls `start` internally
    $cordovaBackgroundGeolocation.configure(options)
    .then(
      null, // Background never resolves
      function (err) { // error callback
        ServerData.alert(err);
      },
      function (location) { // notify callback
        ServerData.alert(location);
      });

    $scope.stopBackgroundGeolocation = function () {
      $cordovaBackgroundGeolocation.stop();
    };

  }, false);
  };
  
  //Battery Status $cordovaBatteryStatus
  //该电池状态插件提供了当前电池状态的API。
  //cordova plugin add cordova-plugin-battery-status
  $scope.BatteryStatus=function(){
  	document.addEventListener("deviceready", function () {

    $rootScope.$on('$cordovaBatteryStatus:status', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
      ServerData.alert(batteryLevel);
    });

    $rootScope.$on('$cordovaBatteryStatus:critical', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
      ServerData.alert(batteryLevel);
    });

    $rootScope.$on('$cordovaBatteryStatus:low', function (result) {
      var batteryLevel = result.level;       // (0 - 100)
      var isPluggedIn  = result.isPlugged;   // bool
      ServerData.alert(batteryLevel);
    });

  }, false);
  };
  
  //Barcode Scanner $cordovaBarcodeScanner
  //条形码扫描器插件打开摄像机视图，并自动地扫描条形码，返回的数据返回给你。
  //cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
  $scope.BarcodeScanner=function(){
  	document.addEventListener("deviceready", function () {

    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        ServerData.alert(barcodeData);
      }, function(error) {
        // An error occurred
      });


    // NOTE: encoding not functioning yet
    $cordovaBarcodeScanner
      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
      .then(function(success) {
      	ServerData.alert(success);
        // Success!
      }, function(error) {
        // An error occurred
      });

  }, false);
  };
  
  //Calendar $cordovaCalendar
  //日历插件可以让你来管理设备上的本地日历事件。
  //cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git
  $scope.Calendar=function(){
  	//更多参考官网
  	document.addEventListener("deviceready", function () {
  		$cordovaCalendar.createCalendar({
		    calendarName: 'Cordova Calendar',
		    calendarColor: '#FF0000'
		  }).then(function (result) {
		    // success
		    ServerData.alert(result);
		  }, function (err) {
		    // error
		  });
  	},false);
  };
  
  //DatePicker $cordovaDatePicker
  //显示日期控件
  //cordova plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git
  $scope.DatePicker=function(){
  	 var options = {
	    date: new Date(),
	    mode: 'date', // or 'time'
	    minDate: new Date() - 10000,
	    allowOldDates: true,
	    allowFutureDates: false,
	    doneButtonLabel: 'DONE',
	    doneButtonColor: '#F2F3F4',
	    cancelButtonLabel: 'CANCEL',
	    cancelButtonColor: '#000000'
	  };

  document.addEventListener("deviceready", function () {

    $cordovaDatePicker.show(options).then(function(date){
        ServerData.alert(date);
    });

  }, false);
  };
  
  //Dialogs $cordovaDialogs
  //弹框
  //cordova plugin add cordova-plugin-dialogs
  $scope.Dialogs=function(){
  	//更多参考官网
  	 $cordovaDialogs.alert('message', 'title', 'button name')
    .then(function() {
      // callback success
      ServerData.alert('成功');
    });

  };
  
  //Toast $cordovaToast
  //小弹框
  //cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
  $scope.Toast=function(){
  	//更多参考官网
  	$cordovaToast.showShortTop('Here is a message').then(function(success) {
    // success
    ServerData.alert('弹框');
  }, function (error) {
    // error
  });
  };
});
