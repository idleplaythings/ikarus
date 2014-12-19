var Q = require('q');

module.exports = {
  info: info,
  error: error,
  asPromised: asPromised
}

function info(str) {
  console.log('[INFO]: ' + str);
}

function error(str) {
  console.error('[ERROR] ' + str);
}

function asPromised(fn, ctx) {
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
