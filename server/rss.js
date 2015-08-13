RssFeed.publish('jobs', function(query) {
  var self = this;
  var pubDate = new Date();
  var lastBuildDate = new Date();
  var mostRecent = Jobs.findOne({}, {
    sort: {
      createdAt: -1
    }
  });
  var secondMostRecent = Jobs.findOne({}, {
    sort: {
      createdAt: -1
    },
    skip: 1
  });
  if (mostRecent)
    pubDate = mostRecent.createdAt;
  if (secondMostRecent)
    lastBuildDate = secondMostRecent.createdAt;

  self.setValue('title', self.cdata('Job Webcup - Offres récentes'));
  self.setValue('description', self.cdata('Ceci est un flux d\'offres d\'emplois récemment posté'));
  self.setValue('link', Meteor.absoluteUrl());
  self.setValue('lastBuildDate', lastBuildDate);
  self.setValue('pubDate', pubDate);
  self.setValue('ttl', 1);

  Jobs.find({
    status: "active"
  }, {
    sort: {
      createdAt: -1
    }
  }).forEach(function(job) {
    self.addItem({
      title: self.cdata(job.title),
      description: self.cdata(job.htmlDescription),
      link: Meteor.absoluteUrl(job.path()),
      guid: Meteor.absoluteUrl(job.path()),
      pubDate: job.createdAt
    });
  });
});

var profileRss = function(query) {
  var self = this;
  var pubDate = new Date();
  var lastBuildDate = new Date();
  var mostRecent = Profiles.findOne({}, {
    sort: {
      createdAt: -1
    }
  });
  var secondMostRecent = Profiles.findOne({}, {
    sort: {
      createdAt: -1
    },
    skip: 1
  });
  if (mostRecent)
    pubDate = mostRecent.createdAt;
  if (secondMostRecent)
    lastBuildDate = secondMostRecent.createdAt;

  self.setValue('title', self.cdata('Job Webcup - Profils récents'));
  self.setValue('description', self.cdata('Ceci est un flux des profils récemment posté'));
  self.setValue('link', Meteor.absoluteUrl());
  self.setValue('lastBuildDate', lastBuildDate);
  self.setValue('pubDate', pubDate);
  self.setValue('ttl', 1);

  Profiles.find({
    status: "active"
  }, {
    sort: {
      createdAt: -1
    }
  }).forEach(function(profile) {
    self.addItem({
      title: self.cdata(profile.title),
      description: self.cdata(profile.htmlDescription),
      link: Meteor.absoluteUrl(profile.path()),
      guid: Meteor.absoluteUrl(profile.path()),
      pubDate: profile.createdAt
    });
  });
};

RssFeed.publish('profiles', profileRss)

RssFeed.publish('experts', profileRss);
