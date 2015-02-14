Package.describe({
  name: 'lukemadera:autoform-pikaday',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Pikaday date picker wrapped for autoform',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0');
  api.use('momentjs:moment');
  api.addFiles([
    'lukemadera:autoform-pikaday.html',
    'lukemadera:autoform-pikaday.css',
    'lukemadera:autoform-pikaday.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lukemadera:autoform-pikaday');
  api.addFiles('lukemadera:autoform-pikaday-tests.js');
});
