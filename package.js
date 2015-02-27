Package.describe({
  name: 'lukemadera:autoform-pikaday',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Pikaday date time picker wrapped for autoform',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/lukemadera/meteor-autoform-pikaday',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0');
  api.use('momentjs:moment@2.0.0');
  api.addFiles([
    'lukemadera_autoform-pikaday.html',
    'lukemadera_autoform-pikaday.css',
    'lukemadera_autoform-pikaday.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lukemadera:autoform-pikaday');
  api.addFiles('lukemadera_autoform-pikaday-tests.js');
});
