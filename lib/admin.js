AdminConfig = {
  name: 'Job Webcup',
  collections: {
    Jobs: {
      icon: 'briefcase',
      tableColumns: [
        {label: 'ID', name: '_id'},
        {label: 'Title', name: 'title'},
        {label: 'User Name', name: 'userName'},
        {label: 'Status', name: 'status'}
      ],
      color: 'red'
    },
    Profiles: {
      icon: 'file-text-o',
      tableColumns: [
        {label: 'ID', name: '_id'},
        {label: 'Title', name: 'title'},
        {label: 'User Name', name: 'userName'},
        {label: 'Status', name: 'status'}
      ],
      color: 'green'
    },
     Metiers: {
      icon: 'file-text-o',
      tableColumns: [
        {label: 'ID', name: '_id'},
        {label: 'Metier', name: 'metier'}
      ],
      color: 'green'
    },  
     Familles: {
      icon: 'file-text-o',
      tableColumns: [
        {label: 'ID', name: '_id'},
        {label: 'Famille metier', name: 'famille'}
      ],
      color: 'green'
    },
      Tagsmetier : {
      icon: 'file-text-o',
      tableColumns: [
        {label: 'ID', name: '_id'},
        {label: 'tag metier', name: 'tag'}
      ],
      color: 'green'
    }    
         
  },
  autoForm:{
    omitFields: ['createdAt','updatedAt']
  }
};
