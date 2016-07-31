Profiles = new Mongo.Collection("experts"); //todo - rename underlying collection to reflect code refactor



Profiles.attachSchema(
  new SimpleSchema({
    userId: {
      type: String,
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
     customImageUrl: {
    type: String,
    optional: true,
    label: "Avatar",
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "avatars",
        label:"Choisir le fichier"
      }
    }
  },
    name: {
      type: String,
      label: "Nom",
      max: 128
    },
    prenom: {
      type: String,
      label: "Prénom",
      max: 128
    },
    company: {
      type: String,
      label: "Société",
      max: 128,
      optional: true
    },
    type: {
      type: String,
      label: "Représentez-vous",
      allowedValues: ["Indépendant", "Société", "Personne physique","Salarié"]
    },
    metiers: {
      type: Array,
      minCount: 1,
      maxCount: 5,
      optional: true
   },
     "metiers.$": {
      type: Object
   },
    "metiers.$.famille": {
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
     "metiers.$.metier": {
      type: String,
      autoform: {
        type: "select",
                options: function() {
                  if (Meteor.isClient) {
                  var docId = '';
               docId = AutoForm.getFieldValue(this.name.replace('.metier', '.famille'));
                 	//alert(this.name.replace('.metier', '.famille'));
               if(docId){

               		 return Metiers.find({famille:docId}, {sort: {metier:1}}).map(function (c) {
                   return {label: c.metier, value: c._id};
               });


            }else{return;}
          }
        }
    }
    },
    "metiers.$.tags": {
      type: [String],
      autoform: {
        type: "select-checkbox-inline",
                        options: function() {
  	var docId = '';
docId = AutoForm.getFieldValue(this.name.replace('.tags', '.metier'))

               if(docId){
               	//alert(docId);
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
    title: {
      type: String,
      label: "Votre poste",
      max: 128
    },
    location: {
      type: String,
      label: "Lieu",
      allowedValues:LIEUWEBCUP,
      max: 128,
      optional: true
    },
    description: {
      type: String,
      label: "Description",
      max: 10000,
      autoform: {
        afFieldInput: SUMMERNOTE_OPTIONS
      }
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
    availableForHire: {
      type: Boolean,
      label: "Êtes-vous actuellement en recherche active d’un emploi ?",
      defaultValue: false
    },
    interestedIn: {
      type: [String],
      label: "Intéressé Par",
      allowedValues: JOB_TYPES,
      optional: true
    },
    tags:{
        type: [String],
        optional: true,
        autoform:{
            type: 'tags',
            afFieldInput:{

            	}
            }
      },
    contact: {
      type: String,
      label: "Contact Info",
      max: 1024,
      optional: true
    },
    url: {
      type: String,
      label: "URL personnelle",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    resumeUrl: {
      type: String,
      label: "URL du CV",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    cvPdf: {
    type: String,
    label: "CV en pdf",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "jobcv",
        label:"Choisir le fichier"
      }
    }
  },
    githubUrl: {
      type: String,
      label: "GitHub URL",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    linkedinUrl: {
      type: String,
      label: "LinkedIn URL",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    stackoverflowUrl: {
      type: String,
      label: "Stackoverflow URL",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    randomSorter: {
      type: Number,
      defaultValue: Math.floor(Math.random() * 10000)
    },
    status: {
      type: String,
      allowedValues: STATUSES,
      defaultValue:"active"
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

Profiles.helpers({
  displayName: function() {
    return this.prenom+' '+this.name || this.userName;
  },
  path: function() {
    return 'profiles/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.displayName() + ' ' + this.title);
  }
});

Profiles.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) || (!_.contains(fieldNames, 'randomSorter') && !_.contains(fieldNames, 'htmlDescription') && !_.contains(fieldNames, 'status') && userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
