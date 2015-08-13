var jobcvstore = new FS.Store.S3("jobcv");

Jobcv = new FS.Collection("jobcv", {
  stores: [jobcvstore],
  filter: {
    allow: {
       contentTypes: ['application/pdf'],
        extensions: ['pdf']
    }
  }
});
