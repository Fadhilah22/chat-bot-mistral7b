const path = require('path');

module.exports = {
    // Your other configurations...
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: false
      }
    }
  };
  
