FS.debug=true

var S3opt = {
  region: Meteor.settings.aws.region,
  accessKeyId: Meteor.settings.aws.access_key, 
  secretAccessKey: Meteor.settings.aws.secret, 
  bucket: Meteor.settings.aws.bucket,
  ACL:'public-read'
};

var jobcvstore = new FS.Store.S3("jobcv", S3opt);

Jobcv = new FS.Collection("jobcv", {
  stores: [jobcvstore],
  filter: {
    allow: {
       contentTypes: ['application/pdf'],
        extensions: ['pdf']
    }
  }
});



Jobcv.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
   return true;
  },
  remove:function(userId,project){
    return true;
  },
  download:function(){
    return true;
  }
});

