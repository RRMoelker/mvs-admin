var ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {
    console.error('deploy error: ' + err);
    throw err;
});
