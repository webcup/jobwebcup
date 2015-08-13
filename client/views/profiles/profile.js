Template.profile.helpers({
  beforeRemove: function() {
    return function(collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.title + '"?')) {
        this.remove();
        //GAnalytics.event("profile", "remove", getUserName(Meteor.user()));
        Router.go('profiles');
      }
    };
  },
  splitInterestedIn: function() {
    if (interestedIn)
      return interestedIn.split(",");
  }
});

Template.jobcvView.helpers({
  cv: function () {
    return Jobcv.find();
  }
});

Template.customavatar200View.helpers({
  avatar: function () {
    return Avatars.find({_id:this.customImageUrl});
  }
});

Template.customavatar100View.helpers({
  avatar: function () {
    return Avatars.find({_id:this.customImageUrl});
  }
})