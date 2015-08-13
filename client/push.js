Meteor.startup(function () {
  
	if (Meteor.isCordova) {
		window.alert = navigator.notification.alert;
	}

 Push.addListener('startup', function(notification) {

  if(notification.payload.pushType === 'jobs'){
    Router.go('job', {
     _id: notification.payload.jobId
    });
  }
  else if(notification.payload.pushType === 'interest'){
    alert('not implemented yet');
  }
});

Push.addListener('message', function(notification) {
		function alertDismissed() {
 if(notification.payload.pushType === 'jobs'){
    Router.go('job', {
      _id: notification.payload.jobId
    });
  }
		}
		window.alert(notification.message, alertDismissed, notification.payload.title, "Ok");
	});
	
});

