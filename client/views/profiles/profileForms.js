AutoForm.addHooks(['profileNew', 'profileEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        console.log("Insert Error:", error);
      } else {
        //GAnalytics.event("profile", "insert", getUserName(Meteor.user()));
        Router.go('profile', {
          _id: result
        });
      }
    },
    update: function(error, result) {
      if (error) {
        console.log("Update Error:", error);
      } else {
        //GAnalytics.event("profile", "update", getUserName(Meteor.user()));
        Router.go('profile', {
          _id: Router.current().params._id
        });
      }
    }
  }
});

Template.profileEdit.events({
  'click #cancel': function(event, template) {
    event.preventDefault();
    Router.go("profile", {
      _id: this.profile._id
    });
  }
})
