FS.debug=true

var S3optav = {
  region: Meteor.settings.aws.region,
  accessKeyId: Meteor.settings.aws.access_key, 
  secretAccessKey: Meteor.settings.aws.secret, 
  bucket: 'jobwebcupavatar',
  ACL:'public-read',
    transformWrite: function(fileObj, readStream, writeStream) {
          gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);  
  } 
};

var S3optth = {
  region: Meteor.settings.aws.region,
  accessKeyId: Meteor.settings.aws.access_key, 
  secretAccessKey: Meteor.settings.aws.secret, 
  bucket: 'jobwebcupavatar.thumb',
  ACL:'public-read',
  transformWrite: function(fileObj, readStream, writeStream) {
          gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);  
  } 
};

var avatarStoreLarge = new FS.Store.S3("avatarsLarge",S3optav);
var avatarStoreSmall = new FS.Store.S3("avatarsSmall",S3optth);


Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreSmall, avatarStoreLarge],
  filter: {
    allow: {
       contentTypes: ['image/*']
    }
  }
});

Avatars.allow({
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

