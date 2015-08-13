Jobs = new Mongo.Collection("jobs");



LocationSchema = new SimpleSchema({
  type : {
    type : String,
    allowedValues: ['Point'],
    autoValue: function() {
    	return "Point";
    }
  },
  coordinates: {
    type: [Number],
    decimal: true,
    minCount: 2,
    maxCount: 2,
            autoform:{
            type: 'map',
            afFieldInput:{
                    geolocation: true,
                    searchBox: true,
                    autolocate: true
                 }
              }
  }
});

Jobs.attachSchema(
  new SimpleSchema({
    title: {
      type: String,
      label: "Titre",
      max: 128
    },
    company: {
      type: String,
      label: "Société",
      max: 128,
      optional: true
    },
    location: {
      type: String,
      label: "Lieu",
      allowedValues:LIEUWEBCUP,
      max: 128,
      optional: true
    },  
    geolocation: {
    type: String,
            autoform:{
            type: 'map',
            afFieldInput:{
                    geolocation: true,
                    searchBox: true,
                    autolocate: true
                 }
              }
  },
    url: {
      type: String,
      label: "Votre site web",
      max: 256,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    contact: {
      type: String,
      label: "Contact Info",
      max: 128
    },
    jobtype: {
      type: String,
      label: "Type",
      allowedValues: JOB_TYPES
    },
    remote: {
      type: Boolean,
      label: "Est-ce que votre offre est en télétravail ?"
    },
     famille: {
      type: String,
      autoform: {
        type: "select",
                options: function () {
            if (Meteor.isClient) {
               return Familles.find({}).map(function (c) {
                   return {label: c.famille, value: c._id};
               });
            }
        }
    }
    },
     metier: {
      type: String,
      autoform: {
        type: "select",
        options: function() {
  	var docId = '';	
               docId = AutoForm.getFieldValue('famille');
               if(docId){
               		 return Metiers.find({famille:docId}, {sort: {metier:1}}).map(function (c) {
                   return {label: c.metier, value: c._id};
               });
               		
              
            }else{return;}
  }   
    }
    },
    tags: {
      type: [String],
      autoform: {
        type: "select-checkbox-inline",
         options: function() {
  	var docId = '';	
               docId = AutoForm.getFieldValue('metier');
               if(docId){
               	var taglist = Metiers.findOne({_id:docId}).tags;
               	if(taglist){
               		 return Tagsmetier.find({_id:{ $in: taglist}}).map(function (c) {
                   return {label: c.tag, value: c._id};
               });
               		}
              
            }else{return;}
  }
    }
    },
    userId: {
      type: String,
      label: "User Id",
      autoValue: function() {
        if (this.isInsert) {
          return Meteor.userId();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: Meteor.userId()
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    userName: {
      type: String,
      label: "Nom d'utilisateur",
      autoValue: function() {
        if (this.isInsert) {
          return getUserName(Meteor.user());
        } else if (this.isUpsert) {
          return {
            $setOnInsert: getUserName(Meteor.user())
          };
        } else {
          this.unset();
        }
      }
    },
    description: {
      type: String,
      label: "Description de l'offre",
      max: 20000,
      autoform: {
        afFieldInput: SUMMERNOTE_OPTIONS
      }
    },
    status: {
      type: String,
      allowedValues: STATUSES,
      defaultValue: "pending"
    },
    // Automatically set HTML content based on markdown content
    // whenever the markdown content is set.
    htmlDescription: {
      type: String,
      optional: true,
      autoValue: function(doc) {
        var htmlContent = this.field("description");
        if (Meteor.isServer && htmlContent.isSet) {
          return cleanHtml(htmlContent.value);
        }
      }
    },
    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: new Date()
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    }
  })
);

Jobs.helpers({
  path: function() {
    return 'jobs/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.title);
  }
});

Jobs.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) || (!_.contains(fieldNames, 'htmlDescription') && !_.contains(fieldNames, 'status') && userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
