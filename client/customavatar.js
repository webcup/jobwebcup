var avatarStoreLarge = new FS.Store.S3("avatarsLarge");
var avatarStoreSmall = new FS.Store.S3("avatarsSmall");


Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreSmall, avatarStoreLarge],
  filter: {
    allow: {
       contentTypes: ['image/*']
    }
  }
});
