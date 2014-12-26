var Q = require('q');
var chalk = require('chalk');

module.exports = {
  info: function info(str) {
    //console.log(chalk.gray('      [info]: ') + str);
  },
  error: function error(str) {
    console.error(chalk.red('      [error] ' + str));
  },
  asPromised: function asPromised(fn, ctx) {
    if (typeof fn !== 'function') {
      throw new Error(fn + ' is not a function');
    }

    return function() {
      var deferred = Q.defer();
      var args = Array.prototype.slice.call(arguments);
      args.push(function(err, result) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(result);
        }
      });

      fn.apply(ctx, args);

      return deferred.promise;
    }
  }
};
