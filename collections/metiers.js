Tagsmetier = new Mongo.Collection("tagsmetiers");

TagsmetierSchema=new SimpleSchema(
{
    tag: {
      type: String,
      label: "tag",
      max: 128,
      unique: true
    }
});

Tagsmetier.attachSchema(TagsmetierSchema);

Familles = new Mongo.Collection("famillemetiers");

FamilleSchema=new SimpleSchema(
{
    famille: {
      type: String,
      label: "Familles",
      max: 128,
      unique: true,
    },
    description: {
      type: String,
      label: "Description",
      max: 200
    },
});

Familles.attachSchema(FamilleSchema);

Metiers = new Mongo.Collection("metiers");
MetiersSchema=new SimpleSchema(
{
    metier: {
      type: String,
      label: "Métier",
      max: 128,
      unique: true,
    },
    famille: {
      type: [String],
      autoform: {
        type: "select-checkbox",
        options: function () {
            return Familles.find().map(function (c) {
                return {label: c.famille, value: c._id};
            });
        }
    }
    },
    tags: {
      type: [String],
      autoform: {
        type: "select2",
        afFieldInput: {
        multiple: true
      },
        options: function () {
            return Tagsmetier.find().map(function (c) {
                return {label: c.tag, value: c._id};
            });
        }},
      optional: true
    }
});
Metiers.attachSchema(MetiersSchema);


/*Cmetiers.attachSchema(
  new SimpleSchema({
    categorie: {
      type: String,
      label: "Famille",
      max: 128
    }
  })
);

Metiers.attachSchema(
  new SimpleSchema({
    metier: {
      type: String,
      label: "Métier",
      max: 128
    }
  })
);*/

Metiers.helpers({
  path: function() {
    return 'metiers/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.metier);
  }
});

Metiers.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Familles.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});
