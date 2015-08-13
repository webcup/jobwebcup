Template.jobExpiredAlert.helpers({
  expired: function() {
    if (this.userId === Meteor.userId()) {
      if ((this.createdAt < daysUntilExpiration()) && (this.updatedAt < daysUntilExpiration())) {
        return true;
      } else if ((this.createdAt < daysUntilExpiration()) && (this.updatedAt === undefined)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
});

Template.jobStatusToggle.helpers({
  "statuses": function() {
    return STATUSES;
  }
});

Template.jobStatusToggle.events({
  "click .set-status": function() {
    Jobs.update({
      _id: Router.current().params._id
    }, {
      $set: {
        status: String(this)
      }
    });
    if(this=="active"){
                      		Push.send({
                        from: 'jobwebcup',
                        title: 'Nouveau job',
                        text: 'Nouveau job webcup',
                        badge: 12,
                        payload: {
                            title: 'Nouveau job sur webcup',
                            jobId: Router.current().params._id,
                            pushType: 'jobs'
                        },
                        query: {
                        }
                    });  	
    	}

  }
});
